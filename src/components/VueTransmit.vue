<template>
   <component :is="tag">
      <slot v-if="filesSlotFirst"
            name="files"
            v-bind="fileSlotBindings" />
      <div class="v-transmit__upload-area"
           :class="[isDraggingClass, uploadAreaClasses]"
           :draggable="!disableDraggable"
           v-bind="uploadAreaAttrs"
           v-on="uploadAreaListeners"
           @click="handleClickUploaderAction"
           @dragstart="handleDragStart"
           @dragend="handleDragEnd"
           @dragenter.prevent.stop="handleDragEnter"
           @dragover.prevent.stop="handleDragOver"
           @dragleave="handleDragLeave"
           @drop.prevent.stop="handleDrop">
         <slot></slot>
      </div>
      <slot v-if="!filesSlotFirst"
            name="files"
            v-bind="fileSlotBindings" />
      <form :style="formStyles"
            ref="uploadForm">
         <input type="file"
                ref="hiddenFileInput"
                :multiple="multiple"
                :class="[maxFilesReachedClass]"
                :accept="filesToAccept"
                :capture="capture"
                @change="onFileInputChange">
      </form>
   </component :is="tag">
</template>

<style>
.v-transmit__upload-area {
	width: 100%;
	border-radius: 1rem;
	border: 2px dashed #bdbdbd;
	min-height: 30vh;
}

@media (min-height: 1000px) {
	.v-transmit__upload-area {
		min-height: 300px;
	}
}

.v-transmit__upload-area--is-dragging {
	background: #e1f5fe
		linear-gradient(
			-45deg,
			#fafafa 25%,
			transparent 25%,
			transparent 50%,
			#fafafa 50%,
			#fafafa 75%,
			transparent 75%,
			transparent
		);
	background-size: 40px 40px;
}
</style>

<script lang="ts">
// @ts-ignore
import Vue, { VueConstructor } from "vue";
import {
	NewObject,
	noop,
	resizeImg,
	webkitIsFile,
	webkitIsDir,
	UploadStatuses,
	VTransmitEvents,
	round,
	expectNever,
	ErrType,
} from "../core/utils";
import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { XHRDriver } from "../upload-adapters/xhr";
import { DriverInterface, DriverConstructor } from "../core/interfaces";

type FileSystemEntry = WebKitFileEntry | WebKitDirectoryEntry;

export default Vue.extend({
	name: "VueTransmit",

	props: {
		tag: {
			type: String,
			default: "div",
		},
		disableDraggable: {
			type: Boolean,
			default: false,
		},
		uploadAreaClasses: {
			type: [Array, Object, String],
			default: null,
		},
		uploadAreaAttrs: {
			type: Object,
			default: NewObject,
		},
		uploadAreaListeners: {
			type: Object,
			default: NewObject,
		},
		dragClass: {
			type: String,
			default: null,
		},
		filesSlotFirst: {
			type: Boolean,
			default: false,
		},
		/**
		 * Sets the maximum number of uploads that can be running at a given time.
		 */
		maxConcurrentUploads: {
			type: Number,
			default: 2,
		},
		/**
		 * Whether to send multiple files in one request.
		 */
		uploadMultiple: {
			type: Boolean,
			default: false,
		},
		/**
		 * Size in MB by default, or MiB if useBinarySizeBase == true
		 */
		maxFileSize: {
			type: Number,
			default: 256,
		},
		/**
		 * By default, a base 10 size is used. This corresponds to KB, MB, GB, etc.
		 * If this property is true, a binary base will be used. This would
		 * correspond to KiB, MiB, GiB.
		 *
		 * Base 10: `1000 ** x` where `x` equal 1(KB), 2(MB), 3(GB), etc.
		 *
		 * Base 2: `1 << x` where `x` equal 10(KiB), 20(MiB), 30(GiB), etc.
		 */
		useBinarySizeBase: {
			type: Boolean,
			default: false,
		},
		createImageThumbnails: {
			type: Boolean,
			default: true,
		},
		// in MB. When the filename exceeds this limit, the thumbnail will not be generated.
		maxThumbnailFileSize: {
			type: Number,
			default: 10,
		},
		thumbnailWidth: {
			type: Number,
			default: 120,
		},
		thumbnailHeight: {
			type: Number,
			default: 120,
		},
		/**
		 * Can be used to limit the maximum number of files that will be handled
		 * by this Dropzone
		 */
		maxFiles: {
			type: Number,
			default: null,
		},
		/**
		 * If true, the dropzone will present a file selector when clicked.
		 */
		clickable: {
			type: Boolean,
			default: true,
		},
		/**
		 * Whether dot files in directories should be ignored.
		 */
		ignoreHiddenFiles: {
			type: Boolean,
			default: true,
		},
		/**
		 * You can set accepted mime types here.
		 *
		 * The default implementation of the `accept()` function will check this
		 * property, and if the Dropzone is clickable this will be used as
		 * `accept` attribute.
		 *
		 * This is a comma separated list of mime types or extensions. E.g.:
		 * - audio/*,video/*,image/png,.pdf
		 *
		 * See https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
		 * for a reference.
		 */
		acceptedFileTypes: {
			type: Array,
			default() {
				return [];
			},
		},
		/**
		 * If false, files will be added to the queue but the queue will not be
		 * processed automatically.
		 * This can be useful if you need some additional user input before sending
		 * files (or if you want want all files sent at once).
		 * If you're ready to send the file simply call myDropzone.processQueue()
		 */
		autoProcessQueue: {
			type: Boolean,
			default: true,
		},
		/**
		 * If false, files added to the dropzone will not be queued by default.
		 * You'll have to call `enqueueFile(file)` manually.
		 */
		autoQueue: {
			type: Boolean,
			default: true,
		},
		/**
		 * If null, no capture type will be specified
		 * If camera, mobile devices will skip the file selection and choose camera
		 * If microphone, mobile devices will skip the file selection and choose the microphone
		 * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
		 * On apple devices multiple must be set to false.  AcceptedFiles may need to
		 * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
		 */
		capture: {
			type: String,
			default: null,
		},
		// If the file size is too big.
		errMaxFileSizeExceeded: {
			type: Function,
			default(fileSize: number, maxFileSize: number, units: string) {
				return (
					`The file is too big (${round(fileSize, 1)}${units}).` +
					` Max file size: ${round(maxFileSize, 1)}${units}.`
				);
			},
		},
		errInvalidFileType: {
			type: Function,
			default(type: string, _acceptedTypes: string[], _file: VTransmitFile) {
				return `You can't upload files of this type: ${type}`;
			},
		},
		errMaxFilesExceeded: {
			type: Function,
			default(maxFiles: number) {
				return `You can not upload any more files (${maxFiles} max).`;
			},
		},
		/**
		 * If `done()` is called without argument the file is accepted
		 * If you call it with an error message, the file is rejected
		 * (This allows for asynchronous validation).
		 */
		accept: {
			type: Function,
			default(_file: VTransmitFile, done: Function) {
				done();
			},
		},
		resize: {
			type: Function,
			default: resizeImg,
		},
		driverOptions: {
			type: Object,
			default: NewObject,
		},
		driver: {
			type: Function,
			default: XHRDriver,
		},
	},

	mounted() {
		this.$on(VTransmitEvents.UploadProgress, this.updateTotalUploadProgress);
		this.$on(VTransmitEvents.RemovedFile, this.updateTotalUploadProgress);
		this.$on(VTransmitEvents.Canceled, (file: VTransmitFile) =>
			this.$emit(VTransmitEvents.Complete, file)
		);
		this.$on(VTransmitEvents.Complete, (file: VTransmitFile) => {
			if (
				this.addedFiles.length === 0 &&
				this.uploadingFiles.length === 0 &&
				this.queuedFiles.length === 0
			) {
				Promise.resolve().then(() =>
					this.$emit(VTransmitEvents.QueueComplete, file)
				);
			}
		});
		window.addEventListener("paste", <any>this.handlePaste);

		this.$emit(VTransmitEvents.Initialize, this);
	},

	beforeDestroy() {
		window.removeEventListener("paste", <any>this.handlePaste);
	},

	data(): {
		dragging: boolean;
		processingThumbnail: boolean;
		thumbnailQueue: VTransmitFile[];
		files: VTransmitFile[];
		defaultHeaders: { [key: string]: string };
		formStyles: { [key: string]: string };
	} {
		return {
			dragging: false,
			// Used to keep the createThumbnail calls processing async one-at-a-time
			processingThumbnail: false,
			thumbnailQueue: [],
			files: [],
			defaultHeaders: {
				Accept: "application/json",
				"Cache-Control": "no-cache",
				"X-Requested-With": "XMLHttpRequest",
			},
			formStyles: {
				visibility: "hidden !important",
				position: "absolute !important",
				top: "0 !important",
				left: "0 !important",
				height: "0px !important",
				width: "0px !important",
			},
		};
	},

	computed: {
		inputEl(): HTMLInputElement | null {
			let el = this.$refs.hiddenFileInput;
			if (!(el instanceof HTMLInputElement)) {
				return null;
			}

			return el;
		},
		formEl(): HTMLFormElement | null {
			let el = this.$refs.uploadForm;
			if (!(el instanceof HTMLFormElement)) {
				return null;
			}

			return el;
		},
		fileSizeBase(): number {
			if (this.useBinarySizeBase) {
				return 1024;
			}

			return 1000;
		},
		maxFileSizeBytes(): number {
			return this.maxFileSize * this.fileSizeBase * this.fileSizeBase;
		},
		filesToAccept(): string {
			return this.acceptedFileTypes.join(",");
		},
		multiple(): boolean {
			return this.maxFiles === null || this.maxFiles > 1;
		},
		addedFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Added);
		},
		queuedFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Queued);
		},
		acceptedFiles(): VTransmitFile[] {
			return this.files.filter(f => f.accepted);
		},
		rejectedFiles(): VTransmitFile[] {
			return this.files.filter(f => !f.accepted);
		},
		uploadingFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Uploading);
		},
		canceledFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Canceled);
		},
		failedFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Error);
		},
		timeoutFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Timeout);
		},
		successfulFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(UploadStatuses.Success);
		},
		activeFiles(): VTransmitFile[] {
			return this.getFilesWithStatus(
				UploadStatuses.Uploading,
				UploadStatuses.Queued
			);
		},
		maxFilesReached(): boolean {
			return (
				this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles
			);
		},
		maxFilesReachedClass(): string | null {
			return this.maxFilesReached ? "v-transmit__max-files--reached" : null;
		},
		isDraggingClass(): Dictionary<boolean> {
			return {
				"v-transmit__upload-area--is-dragging": this.dragging,
				[this.dragClass]: this.dragging,
			};
		},
		isUploading(): boolean {
			return this.uploadingFiles.length > 0;
		},
		fileSlotBindings(): {
			files: VTransmitFile[];
			acceptedFiles: VTransmitFile[];
			rejectedFiles: VTransmitFile[];
			addedFiles: VTransmitFile[];
			queuedFiles: VTransmitFile[];
			uploadingFiles: VTransmitFile[];
			canceledFiles: VTransmitFile[];
			failedFiles: VTransmitFile[];
			timeoutFiles: VTransmitFile[];
			successfulFiles: VTransmitFile[];
			activeFiles: VTransmitFile[];
			isUploading: boolean;
		} {
			return {
				files: this.files,
				acceptedFiles: this.acceptedFiles,
				rejectedFiles: this.rejectedFiles,
				addedFiles: this.addedFiles,
				queuedFiles: this.queuedFiles,
				uploadingFiles: this.uploadingFiles,
				canceledFiles: this.canceledFiles,
				failedFiles: this.failedFiles,
				timeoutFiles: this.timeoutFiles,
				successfulFiles: this.successfulFiles,
				activeFiles: this.activeFiles,
				isUploading: this.isUploading,
			};
		},
		transport(): DriverInterface {
			let Driver: DriverConstructor = <any>this.driver;
			try {
				return new Driver(
					new VTransmitUploadContext(this),
					this.driverOptions
				);
			} catch (err) {
				console.error(`[vue-transmit] Error resolving upload driver:`, err);
				throw err;
			}
		},
	},

	watch: {
		acceptedFiles(acceptedFiles: VTransmitFile[]) {
			if (this.maxFiles == null) {
				return;
			}
			if (acceptedFiles.length >= this.maxFiles) {
				this.$emit(VTransmitEvents.MaxFilesReached, this.files);
			}
		},
	},

	methods: {
		getFilesWithStatus(...statuses: UploadStatuses[]): VTransmitFile[] {
			return this.files.filter(f => statuses.indexOf(f.status) > -1);
		},
		onFileInputChange(): void {
			let { inputEl, formEl } = this;
			if (inputEl == null || formEl == null) {
				// This is unreachable code,
				// but we need to let TS know it.
				throw TypeError();
			}

			// Can be null
			if (!inputEl.files) {
				return;
			}

			this.$emit(
				VTransmitEvents.AddedFiles,
				Array.from(inputEl.files).map(this.addFile)
			);

			// Reset input element's files
			// https://github.com/alexsasharegan/vue-transmit/issues/25
			formEl.reset();
		},
		addFile(file: File): VTransmitFile {
			const vtFile = new VTransmitFile(file);
			vtFile.status = UploadStatuses.Added;
			this.files.push(vtFile);
			this.$emit(VTransmitEvents.AddedFile, vtFile);
			this.enqueueThumbnail(vtFile);
			this.acceptFile(vtFile, (error?: string) => {
				if (error) {
					vtFile.accepted = false;
					this.errorProcessing([vtFile], error);
					this.$emit(VTransmitEvents.RejectedFile, vtFile);
					this.$emit(VTransmitEvents.AcceptComplete, vtFile);
					return;
				}

				vtFile.accepted = true;
				this.$emit(VTransmitEvents.AcceptedFile, vtFile);
				this.$emit(VTransmitEvents.AcceptComplete, vtFile);
				if (this.autoQueue) {
					this.enqueueFile(vtFile);
				}
			});

			return vtFile;
		},
		acceptFile(file: VTransmitFile, done: (err?: string) => void): void {
			// File size check
			if (file.size > this.maxFileSizeBytes) {
				// size is in bytes, base is kilo multiplier, so base * base == mega
				let mega = this.fileSizeBase * this.fileSizeBase;
				let fileSize = file.size / mega;
				let units = "MB";
				if (this.useBinarySizeBase) {
					units = "MiB";
				}
				return done(
					this.errMaxFileSizeExceeded(fileSize, this.maxFileSize, units)
				);
			}

			// File type check
			if (!this.isValidFileType(file, this.acceptedFileTypes)) {
				return done(
					this.errInvalidFileType(file.type, this.acceptedFileTypes, file)
				);
			}

			// Upload limit check
			if (
				this.maxFiles != null &&
				this.acceptedFiles.length >= this.maxFiles
			) {
				this.$emit(VTransmitEvents.MaxFilesExceeded, file);
				return done(this.errMaxFilesExceeded(this.maxFiles));
			}

			// Happy path 😀
			this.accept(file, done);
		},
		removeFile(file: VTransmitFile): void {
			if (file.status === UploadStatuses.Uploading) {
				this.cancelUpload(file);
			}
			const idxToRm = this.files.findIndex(f => f.id === file.id);
			if (idxToRm > -1) {
				this.$emit(
					VTransmitEvents.RemovedFile,
					this.files.splice(idxToRm, 1)[0]
				);
				if (this.files.length === 0) {
					this.$emit(VTransmitEvents.Reset);
				}
			}
		},
		removeFilesWithStatus(...statuses: UploadStatuses[]): void {
			this.getFilesWithStatus(...statuses).map(this.removeFile);
		},
		removeAllFiles(cancelInProgressUploads = false): void {
			let filesToRemove: VTransmitFile[] = this.files;
			if (!cancelInProgressUploads) {
				filesToRemove = filesToRemove.filter(
					f => f.status !== UploadStatuses.Uploading
				);
			}
			filesToRemove.map(this.removeFile);
		},
		triggerBrowseFiles(): void {
			if (this.inputEl) {
				this.inputEl.click();
			}
		},
		handleClickUploaderAction(): void {
			if (this.clickable) {
				this.triggerBrowseFiles();
			}
		},
		enqueueFile(file: VTransmitFile): void {
			if (file.status !== UploadStatuses.Added || file.accepted !== true) {
				throw new Error(
					"This file can't be queued because it has already been processed or was rejected."
				);
			}

			file.status = UploadStatuses.Queued;
			if (this.autoProcessQueue) {
				Promise.resolve().then(this.processQueue);
			}
		},
		enqueueThumbnail(file: VTransmitFile): void {
			if (
				!this.createImageThumbnails ||
				!file.type.match(/image.*/) ||
				file.size > this.maxThumbnailFileSize * 1024 * 1024
			) {
				return;
			}

			this.thumbnailQueue.push(file);
			Promise.resolve().then(this.processThumbnailQueue);
		},
		processThumbnailQueue(): void {
			let file: VTransmitFile | undefined;

			// Employ a chain of self-calling, self-queuing createThumbnail calls
			// so execution can stay as non-blocking as possible.
			if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
				return;
			}

			this.processingThumbnail = true;
			if ((file = this.thumbnailQueue.shift())) {
				this.createThumbnail(file, () => {
					this.processingThumbnail = false;
					this.processThumbnailQueue();
				});
			}
		},
		createThumbnail(file: VTransmitFile, callback = noop): void {
			const reader = new FileReader();
			reader.addEventListener(
				"load",
				() => {
					if (file.type === "image/svg+xml") {
						file.dataUrl = reader.result;
						this.$emit(VTransmitEvents.Thumbnail, file, reader.result);
						callback();
					}
					this.createThumbnailFromUrl(file, reader.result, callback);
				},
				false
			);

			// FileReader requires a native File|Blob object
			reader.readAsDataURL(file.nativeFile);
		},
		createThumbnailFromUrl(
			file: VTransmitFile,
			imageUrl: string,
			callback?: Function
		): void {
			const imgEl = document.createElement("img");

			imgEl.addEventListener(
				"load",
				() => {
					let ctx: CanvasRenderingContext2D | null;
					file.width = imgEl.width;
					file.height = imgEl.height;
					const resizeInfo = this.resize(file, {
						width: this.thumbnailWidth,
						height: this.thumbnailHeight,
					});
					const canvas = document.createElement("canvas");
					// Can be null
					if (!(ctx = canvas.getContext("2d"))) {
						return;
					}

					canvas.width = resizeInfo.dWidth;
					canvas.height = resizeInfo.dHeight;
					ctx.drawImage(
						imgEl,
						resizeInfo.sx,
						resizeInfo.sy,
						resizeInfo.sWidth,
						resizeInfo.sHeight,
						resizeInfo.dx,
						resizeInfo.dy,
						resizeInfo.dWidth,
						resizeInfo.dHeight
					);
					const thumbnail = canvas.toDataURL("image/png");
					file.dataUrl = thumbnail;
					this.$emit(VTransmitEvents.Thumbnail, file, thumbnail);

					if (callback) {
						return callback();
					}
				},
				false
			);
			if (callback) {
				imgEl.addEventListener(
					"error",
					callback as EventListenerOrEventListenerObject,
					false
				);
			}

			imgEl.src = imageUrl;
		},
		processQueue(): void {
			const len_uploading = this.uploadingFiles.length;
			if (
				len_uploading >= this.maxConcurrentUploads ||
				this.queuedFiles.length === 0
			) {
				return;
			}

			if (this.uploadMultiple) {
				return this.processFiles(
					this.queuedFiles.slice(
						0,
						this.maxConcurrentUploads - len_uploading
					)
				);
			}

			let i = len_uploading;
			let file: VTransmitFile | undefined;
			for (; i < this.maxConcurrentUploads; i++) {
				if ((file = this.queuedFiles.shift())) {
					this.processFile(file);
				}
			}
		},
		processFile(file: VTransmitFile): void {
			this.processFiles([file]);
		},
		processFiles(files: VTransmitFile[]): void {
			let file: VTransmitFile;
			for (file of files) {
				file.processing = true;
				file.status = UploadStatuses.Uploading;
				this.$emit(VTransmitEvents.Processing, file);
			}
			if (this.uploadMultiple) {
				this.$emit(VTransmitEvents.ProcessingMultiple, files);
			}

			return this.uploadFiles(files);
		},
		cancelUpload(file: VTransmitFile): void {
			// Cancel a file before uploading
			if (
				file.status === UploadStatuses.Added ||
				file.status === UploadStatuses.Queued
			) {
				file.status = UploadStatuses.Canceled;
				this.$emit(VTransmitEvents.Canceled, file);
				if (this.uploadMultiple) {
					this.$emit(VTransmitEvents.CanceledMultiple, [file]);
				}
			}

			// Cancel an in-progress upload
			if (file.status === UploadStatuses.Uploading) {
				let canceledFiles = this.transport.cancelUpload(file);
				let f: VTransmitFile;
				for (f of canceledFiles) {
					f.status = UploadStatuses.Canceled;
					this.$emit(VTransmitEvents.Canceled, f);
				}

				if (this.uploadMultiple) {
					this.$emit(VTransmitEvents.CanceledMultiple, canceledFiles);
				}
			}

			if (this.autoProcessQueue) {
				this.processQueue();
			}
		},
		uploadFile(file: VTransmitFile): void {
			this.uploadFiles([file]);
		},
		uploadFiles(files: VTransmitFile[]): void {
			this.transport.uploadFiles(files).then(result => {
				if (result.ok) {
					return this.uploadFinished(files, result.data);
				}

				switch (result.err.type) {
					case ErrType.Any:
						this.errorProcessing(
							files,
							result.err.message,
							result.err.data
						);
						break;

					case ErrType.Timeout:
						this.handleTimeout(
							files,
							result.err.message,
							result.err.data
						);
						break;

					default:
						expectNever(result.err.type, "unmatched error case");
						break;
				}
			});
		},
		handleTimeout(files: VTransmitFile[], message: string, data: any): void {
			let f: VTransmitFile;
			for (f of files) {
				f.status = UploadStatuses.Timeout;
				f.endProgress();
				this.$emit(VTransmitEvents.Timeout, f, message, data);
			}
			this.$emit(VTransmitEvents.TimeoutMultiple, files, message, data);

			if (this.autoProcessQueue) {
				this.processQueue();
			}
		},
		updateTotalUploadProgress(): void {
			const progress = this.activeFiles.reduce(
				(memo, file) => {
					memo.totalBytesSent += file.upload.bytesSent;
					memo.totalBytes += file.upload.total;
					return memo;
				},
				{ totalBytesSent: 0, totalBytes: 0, totalProgress: 100 }
			);

			if (this.activeFiles.length) {
				progress.totalProgress =
					100 * progress.totalBytesSent / progress.totalBytes;
			}

			this.$emit(VTransmitEvents.TotalUploadProgress, progress);
		},
		uploadFinished(
			files: VTransmitFile[],
			response: string | object | any[],
			...args: any[]
		): void {
			for (const file of files) {
				file.status = UploadStatuses.Success;
				file.endProgress();
				this.$emit(VTransmitEvents.Success, file, response, ...args);
				this.$emit(VTransmitEvents.Complete, file);
			}

			if (this.uploadMultiple) {
				this.$emit(
					VTransmitEvents.SuccessMultiple,
					files,
					response,
					...args
				);
				this.$emit(VTransmitEvents.CompleteMultiple, files);
			}

			if (this.autoProcessQueue) {
				this.processQueue();
			}
		},
		errorProcessing(files: VTransmitFile[], message: string, data?: any) {
			for (const file of files) {
				file.status = UploadStatuses.Error;
				file.errorMessage = message;
				file.endProgress();
				this.$emit(VTransmitEvents.Error, file, message, data);
				this.$emit(VTransmitEvents.Complete, file);
			}

			if (this.uploadMultiple) {
				this.$emit(VTransmitEvents.ErrorMultiple, files, message, data);
				this.$emit(VTransmitEvents.CompleteMultiple, files);
			}

			if (this.autoProcessQueue) {
				return this.processQueue();
			}
		},
		isValidFileType(
			file: VTransmitFile,
			acceptedFileTypes: string[]
		): boolean {
			if (!acceptedFileTypes.length) {
				return true;
			}
			const mime_type = file.type;
			const base_type = mime_type.slice(0, mime_type.indexOf("/"));
			let valid_type: string;
			// Return true on the first condition match,
			// otherwise exhaust all conditions and return false.
			for (valid_type of acceptedFileTypes) {
				switch (true) {
					// Handle extension validation
					case valid_type.charAt(0) == ".":
						// Ensure extension exists at the end of the filename.
						if (
							file.name
								.toLowerCase()
								.indexOf(
									valid_type.toLowerCase(),
									file.name.length - valid_type.length
								) !== -1
						) {
							return true;
						}
						break;

					// Handle globs ("image/*")
					case valid_type.slice(-2) == "/*":
						if (base_type === valid_type.slice(0, -2)) {
							return true;
						}
						break;

					// Match mimetype exact
					default:
						if (mime_type == valid_type) {
							return true;
						}
						break;
				}
			}

			return false;
		},
		handleDragStart(e: DragEvent): void {
			this.$emit("drag-start", e);
		},
		handleDragOver(e: DragEvent): void {
			this.dragging = true;
			let effect;
			try {
				// Handle browser bug
				effect = e.dataTransfer.effectAllowed;
			} catch (error) {}
			e.dataTransfer.dropEffect =
				effect === "move" || effect === "linkMove" ? "move" : "copy";
			this.$emit(VTransmitEvents.DragOver, e);
		},
		handleDragEnter(e: DragEvent): void {
			this.dragging = true;
			this.$emit(VTransmitEvents.DragEnter, e);
		},
		handleDragLeave(e: DragEvent): void {
			this.dragging = false;
			this.$emit(VTransmitEvents.DragLeave, e);
		},
		handleDragEnd(e: DragEvent): void {
			this.dragging = false;
			this.$emit(VTransmitEvents.DragEnd, e);
		},
		handleDrop(e: DragEvent): void {
			this.dragging = false;
			if (!e.dataTransfer) {
				return;
			}

			let files: File[];
			let items: DataTransferItem[];

			this.$emit(VTransmitEvents.Drop, e);
			this.$emit(
				VTransmitEvents.AddedFiles,
				(files = Array.from(e.dataTransfer.files))
			);

			if (!e.dataTransfer.items) {
				this.handleFiles(files);
				return;
			}

			items = Array.from(e.dataTransfer.items);
			if (
				!items ||
				!items.length ||
				!(items[0].getAsFile || items[0].webkitGetAsEntry)
			) {
				this.handleFiles(files);
				return;
			}

			this.addFilesFromItems(items);
		},
		handlePaste(e: ClipboardEvent): void {
			let cb = e.clipboardData || window.clipboardData;
			if (!e || !e.clipboardData || !e.clipboardData.items) {
				return;
			}
			this.$emit(VTransmitEvents.Paste, e);
			const items = Array.from(e.clipboardData.items);
			if (items.length) {
				this.addFilesFromItems(items);
			}
		},
		handleFiles(files: File[]): VTransmitFile[] {
			return files.map(this.addFile);
		},
		addFilesFromItems(items: DataTransferItem[]): void {
			let entry: FileSystemEntry;
			for (const item of items) {
				// Newer API on standards track
				if (item.getAsFile && item.kind == "file") {
					let file = item.getAsFile();
					if (file) {
						this.addFile(file);
					}
					continue;
				}

				// Vendor prefixed experimental API
				if (item.webkitGetAsEntry) {
					entry = item.webkitGetAsEntry();

					if (entry == null) {
						continue;
					}
					if (webkitIsFile(entry)) {
						entry.file(this.addFile as any, console.error);
						continue;
					}
					if (webkitIsDir(entry)) {
						this.addFilesFromDirectory(entry, entry.name);
						continue;
					}
				}
			}
		},
		addFilesFromDirectory(
			directory: WebKitDirectoryEntry,
			path: string
		): void {
			directory.createReader().readEntries(
				<any>((entries: FileSystemEntry[]) => {
					for (const entry of entries) {
						if (entry == null) {
							continue;
						}
						if (webkitIsDir(entry)) {
							this.addFilesFromDirectory(entry, `${path}/${entry.name}`);
							continue;
						}
						if (webkitIsFile(entry)) {
							entry.file(
								<any>((file: File) => {
									if (
										this.ignoreHiddenFiles &&
										file.name.charAt(0) == "."
									) {
										return;
									}
									(file as any).fullPath = `${path}/${file.name}`;
									this.addFile(file);
								}),
								console.error
							);
						}
					}
				}),
				console.error
			);
		},
	},
});
</script>
