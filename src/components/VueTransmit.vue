<template>
	<component :is="tag">
		<div class="v-transmit__upload-area"
		     :class="[isDraggingClass, uploadAreaClasses]"
		     draggable="true"
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
		<slot name="files"
		      v-bind="fileSlotBindings"></slot>
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

<style lang="scss">
	$border-color: #bdbdbd;
	$drop-color: #e1f5fe;
	$drop-color-alt: #fafafa;

	.v-transmit__upload-area {
		width: 100%;
		border-radius: 1rem;
		border: 2px dashed $border-color;
		min-height: 30vh;

		@media (min-height: 1000px) {
			min-height: 300px;
		}
	}

	.v-transmit__upload-area--is-dragging {
		background: $drop-color
			linear-gradient(
				-45deg,
				$drop-color-alt 25%,
				transparent 25%,
				transparent 50%,
				$drop-color-alt 50%,
				$drop-color-alt 75%,
				transparent 75%,
				transparent
			);
		background-size: 40px 40px;
	}
</style>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import noop from "lodash-es/noop"
import {
	objFactory,
	resizeImg,
	DrawImageArgs,
	Dimensions,
	webkitIsFile,
	webkitIsDir,
	UploadStatuses,
	VTransmitEvents as Events,
} from "../core/utils"
import { VTransmitFile } from "../classes/VTransmitFile"
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext"
import { XHRUploadAdapter } from "../upload-adapters/xhr"
import { UploaderConstructor, UploaderInterface } from "../core/interfaces"

type FileSystemEntry = WebKitFileEntry | WebKitDirectoryEntry

@Component({ name: "VueTransmit" })
export default class VueTransmit extends Vue {
	@Prop({ type: String, default: "div" })
	tag: string
	@Prop({ type: [Array, Object, String], default: null })
	uploadAreaClasses: any[] | object | string
	@Prop({ type: Object, default: objFactory })
	uploadAreaAttrs: { [key: string]: any }
	@Prop({ type: Object, default: objFactory })
	uploadAreaListeners: { [key: string]: any }
	@Prop({ type: String, default: null })
	dragClass: string
	/**
	 * Sets the maximum number of uploads that can be running at a given time.
	 */
	@Prop({ type: Number, default: 2 })
	maxConcurrentUploads: number
	/**
	 * Whether to send multiple files in one request.
	 */
	@Prop({ type: Boolean, default: false })
	uploadMultiple: boolean
	/**
	 * Size in MB by default, or MiB if fileSizeBaseInBinary === true
	 */
	@Prop({ type: Number, default: 256 })
	maxFileSize: number
	/**
   * The base that is used to calculate the file size.
	 * You can change this to 1024 if you would rather display kibibytes, mebibytes, etc...
   * 1024 is technically incorrect,
   * because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
   * You can change this to `1024` if you don't care about validity.
   */
	@Prop({ type: Boolean, default: false })
	fileSizeBaseInBinary: boolean
	@Prop({ type: Boolean, default: true })
	createImageThumbnails: boolean
	// in MB. When the filename exceeds this limit, the thumbnail will not be generated.
	@Prop({ type: Number, default: 10 })
	maxThumbnailFileSize: number
	@Prop({ type: Number, default: 120 })
	thumbnailWidth: number
	@Prop({ type: Number, default: 120 })
	thumbnailHeight: number
	/**
   * Can be used to limit the maximum number of files that will be handled
   * by this Dropzone
   */
	@Prop({ type: Number, default: null })
	maxFiles: number
	/**
	 * If true, the dropzone will present a file selector when clicked.
	 */
	@Prop({ type: Boolean, default: true })
	clickable: boolean
	/**
	 * Whether dot files in directories should be ignored.
	 */
	@Prop({ type: Boolean, default: true })
	ignoreHiddenFiles: boolean
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
	@Prop({ type: Array, default: () => [] })
	acceptedFileTypes: string[]
	/**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call myDropzone.processQueue()
   */
	@Prop({ type: Boolean, default: true })
	autoProcessQueue: boolean
	/**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */
	@Prop({ type: Boolean, default: true })
	autoQueue: boolean
	/**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */
	@Prop({ type: String, default: null })
	capture: string
	// If the file size is too big.
	@Prop({
		type: Function,
		default: (fileSize: number, maxFileSize: number, units: string) =>
			`The file is too big (${fileSize}${units}). Max file size: ${maxFileSize}${units}.`,
	})
	errMaxFileSizeExceeded: (fileSize: number, maxFileSize: number, units: string) => string
	// If the file doesn't match the file type.
	@Prop({ type: Function, default: (file: VTransmitFile) => `You can't upload files of this type: ${file.type}` })
	errInvalidFileType: (file: VTransmitFile) => string
	/**
   * Displayed when the maxFiles have been exceeded
   * You can use {{maxFiles}} here, which will be replaced by the option.
   */
	@Prop({ type: String, default: (maxFiles: number) => `You can not upload any more files (${maxFiles} max).` })
	errMaxFilesExceeded: (maxFiles: number) => string
	/**
   * If `done()` is called without argument the file is accepted
   * If you call it with an error message, the file is rejected
   * (This allows for asynchronous validation).
   */
	@Prop({ type: Function, default: (_, done: Function) => done() })
	accept: (file: VTransmitFile, done: (err?: string) => void) => void
	@Prop({ type: Function, default: resizeImg })
	resize: (file: VTransmitFile, dims: Dimensions) => DrawImageArgs
	@Prop({ type: Object, default: objFactory })
	adapterOptions: { [key: string]: any }
	@Prop({ type: Object, default: XHRUploadAdapter })
	uploadAdapter: UploaderConstructor

	public dragging: boolean = false
	// Used to keep the createThumbnail calls processing async one-at-a-time
	private processingThumbnail: boolean = false
	public thumbnailQueue: any[] = []
	public files: VTransmitFile[] = []
	public defaultHeaders: object = {
		Accept: "application/json",
		"Cache-Control": "no-cache",
		"X-Requested-With": "XMLHttpRequest",
	}
	public formStyles: object = {
		visibility: "hidden !important",
		position: "absolute !important",
		top: "0 !important",
		left: "0 !important",
		height: "0px !important",
		width: "0px !important",
	}

	get inputEl(): HTMLInputElement {
		let el = null
		if (this.$refs.hiddenFileInput instanceof HTMLInputElement) {
			el = this.$refs.hiddenFileInput
		}
		return el
	}
	get formEl(): HTMLFormElement {
		let el = null
		if (this.$refs.uploadForm instanceof HTMLFormElement) {
			el = this.$refs.uploadForm
		}
		return el
	}
	get fileSizeBase(): number {
		if (this.fileSizeBaseInBinary) {
			return 1024
		}

		return 1000
	}
	get maxFileSizeBytes(): number {
		return this.maxFileSize * this.fileSizeBase * this.fileSizeBase
	}
	get filesToAccept(): string {
		return this.acceptedFileTypes.join(",")
	}
	get multiple(): boolean {
		return this.maxFiles === null || this.maxFiles > 1
	}
	get acceptedFiles(): VTransmitFile[] {
		return this.files.filter(f => f.accepted)
	}
	get rejectedFiles(): VTransmitFile[] {
		return this.files.filter(f => !f.accepted)
	}
	get addedFiles(): VTransmitFile[] {
		return this.getFilesWithStatus(UploadStatuses.Added)
	}
	get queuedFiles(): VTransmitFile[] {
		return this.getFilesWithStatus(UploadStatuses.Queued)
	}
	get uploadingFiles(): VTransmitFile[] {
		return this.getFilesWithStatus(UploadStatuses.Uploading)
	}
	get activeFiles(): VTransmitFile[] {
		return this.getFilesWithStatus(UploadStatuses.Uploading, UploadStatuses.Queued)
	}
	get maxFilesReached(): boolean {
		// Loose equality to check both null && undefined
		return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles
	}
	get maxFilesReachedClass(): string {
		return this.maxFilesReached ? "v-transmit__max-files--reached" : null
	}
	get isDraggingClass(): { [key: string]: boolean } {
		return {
			"v-transmit__upload-area--is-dragging": this.dragging,
			[this.dragClass]: this.dragging,
		}
	}
	get isUploading(): boolean {
		return this.uploadingFiles.length > 0
	}
	get fileSlotBindings() {
		return {
			files: this.files,
			acceptedFiles: this.acceptedFiles,
			rejectedFiles: this.rejectedFiles,
			addedFiles: this.addedFiles,
			queuedFiles: this.queuedFiles,
			uploadingFiles: this.uploadingFiles,
			activeFiles: this.activeFiles,
			isUploading: this.isUploading,
		}
	}
	get uploader(): UploaderInterface {
		return new this.uploadAdapter(new VTransmitUploadContext(this), this.adapterOptions)
	}

	@Watch("acceptedFiles")
	onAcceptedFilesChange(acceptedFiles: VTransmitFile[]) {
		if (this.maxFiles == null) {
			return
		}
		if (acceptedFiles.length >= this.maxFiles) {
			this.$emit(Events.MaxFilesReached, this.files)
		}
	}

	getFilesWithStatus(...statuses: UploadStatuses[]): VTransmitFile[] {
		return this.files.filter(f => statuses.indexOf(f.status) > -1)
	}
	onFileInputChange(): void {
		this.$emit(Events.AddedFiles, Array.from(this.inputEl.files).map(this.addFile))
		this.formEl.reset()
	}
	addFile(file: File): VTransmitFile {
		const vtFile = VTransmitFile.fromNativeFile(file)
		vtFile.status = UploadStatuses.Added
		this.files.push(vtFile)
		this.$emit(Events.AddedFile, vtFile)
		this.enqueueThumbnail(vtFile)
		this.acceptFile(vtFile, (error: string) => {
			if (error) {
				vtFile.accepted = false
				this.errorProcessing([vtFile], error)
				this.$emit(Events.RejectedFile, vtFile)
				this.$emit(Events.AcceptComplete, vtFile)
				return
			}

			vtFile.accepted = true
			this.$emit(Events.AcceptedFile, vtFile)
			this.$emit(Events.AcceptComplete, vtFile)
			if (this.autoQueue) {
				this.enqueueFile(vtFile)
			}
		})

		return vtFile
	}
	acceptFile(file: VTransmitFile, done: (err?: string) => void): void {
		// File size check
		if (file.size > this.maxFileSizeBytes) {
			// size is in bytes, base is kilo multiplier, so base * base == mega
			let baseMega = this.fileSizeBase * this.fileSizeBase
			let fileSize = Math.trunc(file.size / baseMega)
			fileSize += (file.size % baseMega) / baseMega
			return done(this.errMaxFileSizeExceeded(fileSize, this.maxFileSize, this.fileSizeBaseInBinary ? "MiB" : "MB"))
		}

		// File type check
		if (!this.isValidFileType(file, this.acceptedFileTypes)) {
			return done(this.errInvalidFileType(file))
		}

		// Upload limit check
		if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
			this.$emit(Events.MaxFilesExceeded, file)
			// return done(this.dictMaxFilesExceeded.replace(hbsRegex, hbsReplacer({ maxFiles: this.maxFiles })))
			return done(this.errMaxFilesExceeded(this.maxFiles))
		}

		// Happy path 😀
		this.accept(file, done)
	}
	removeFile(file: VTransmitFile): void {
		if (file.status === UploadStatuses.Uploading) {
			this.cancelUpload(file)
		}
		const idxToRm = this.files.findIndex(f => f.id === file.id)
		if (~idxToRm) {
			this.$emit(Events.RemovedFile, this.files.splice(idxToRm, 1)[0])
			if (this.files.length === 0) {
				this.$emit(Events.Reset)
			}
		}
	}
	removeAllFiles(cancelInProgressUploads = false): void {
		for (const file of this.files) {
			if (file.status !== UploadStatuses.Uploading || cancelInProgressUploads) {
				this.removeFile(file)
			}
		}
	}
	triggerBrowseFiles(): void {
		this.inputEl.click()
	}
	handleClickUploaderAction(): void {
		if (this.clickable) {
			this.triggerBrowseFiles()
		}
	}
	enqueueFile(file: VTransmitFile): void {
		if (file.status !== UploadStatuses.Added || file.accepted !== true) {
			throw new Error("This file can't be queued because it has already been processed or was rejected.")
		}

		file.status = UploadStatuses.Queued
		if (this.autoProcessQueue) {
			setTimeout(this.processQueue, 0)
		}
	}
	enqueueThumbnail(file: VTransmitFile): void {
		if (
			!this.createImageThumbnails ||
			!file.type.match(/image.*/) ||
			file.size > this.maxThumbnailFileSize * 1024 * 1024
		) {
			return
		}

		this.thumbnailQueue.push(file)
		setTimeout(this.processThumbnailQueue, 0)
	}
	processThumbnailQueue(): void {
		// Employ a chain of self-calling, self-queuing createThumbnail calls
		// so execution can stay as non-blocking as possible.
		if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
			return
		}

		this.processingThumbnail = true
		this.createThumbnail(this.thumbnailQueue.shift(), () => {
			this.processingThumbnail = false
			this.processThumbnailQueue()
		})
	}
	createThumbnail(file: VTransmitFile, callback = noop): void {
		const reader = new FileReader()
		reader.addEventListener(
			"load",
			() => {
				if (file.type === "image/svg+xml") {
					file.dataUrl = reader.result
					this.$emit(Events.Thumbnail, file, reader.result)
					callback()
				}
				this.createThumbnailFromUrl(file, reader.result, callback)
			},
			false
		)

		// FileReader requires a native File|Blob object
		reader.readAsDataURL(file.nativeFile)
	}
	createThumbnailFromUrl(file: VTransmitFile, imageUrl: string, callback?: Function): void {
		const imgEl = document.createElement("img")

		imgEl.addEventListener(
			"load",
			() => {
				file.width = imgEl.width
				file.height = imgEl.height
				const resizeInfo = this.resize(file, {
					width: this.thumbnailWidth,
					height: this.thumbnailHeight,
				})
				const canvas = document.createElement("canvas")
				const ctx = canvas.getContext("2d")
				canvas.width = resizeInfo.dWidth
				canvas.height = resizeInfo.dHeight
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
				)
				const thumbnail = canvas.toDataURL("image/png")
				file.dataUrl = thumbnail
				this.$emit(Events.Thumbnail, file, thumbnail)

				if (callback) {
					return callback()
				}
			},
			false
		)
		if (callback) {
			imgEl.addEventListener("error", callback as EventListenerOrEventListenerObject, false)
		}

		imgEl.src = imageUrl
	}
	processQueue(): void {
		const processingLength = this.uploadingFiles.length
		if (processingLength >= this.maxConcurrentUploads || this.queuedFiles.length === 0) {
			return
		}

		const queuedFiles = [...this.queuedFiles]
		if (this.uploadMultiple) {
			return this.processFiles(queuedFiles.slice(0, this.maxConcurrentUploads - processingLength))
		}

		let i = processingLength
		let file: VTransmitFile
		for (; i < this.maxConcurrentUploads; i++) {
			if ((file = queuedFiles.shift())) {
				this.processFile(file)
			}
		}
	}
	processFile(file: VTransmitFile): void {
		this.processFiles([file])
	}
	processFiles(files: VTransmitFile[]): void {
		for (const file of files) {
			file.processing = true
			file.status = UploadStatuses.Uploading
			this.$emit(Events.Processing, file)
		}
		if (this.uploadMultiple) {
			this.$emit(Events.ProcessingMultiple, files)
		}

		return this.uploadFiles(files)
	}
	cancelUpload(file: VTransmitFile): void {
		// Cancel a file before uploading
		if (file.status === UploadStatuses.Added || file.status === UploadStatuses.Queued) {
			file.status = UploadStatuses.Canceled
			this.$emit(Events.Canceled, file)
			if (this.uploadMultiple) {
				this.$emit(Events.CanceledMultiple, [file])
			}
		}

		// Cancel an in-progress upload
		if (file.status === UploadStatuses.Uploading) {
			let canceledFiles = this.uploader.cancelUpload(file)
			let f: VTransmitFile
			for (f of canceledFiles) {
				f.status = UploadStatuses.Canceled
				this.$emit(Events.Canceled, f)
			}

			if (this.uploadMultiple) {
				this.$emit(Events.CanceledMultiple, canceledFiles)
			}
		}

		if (this.autoProcessQueue) {
			this.processQueue()
		}
	}
	uploadFile(file: VTransmitFile): void {
		this.uploadFiles([file])
	}
	uploadFiles(files: VTransmitFile[]): void {
		this.uploader
			.uploadFiles(files)
			.then(response => this.uploadFinished(files, response))
			.catch(err => {
				this.errorProcessing(files, err)
			})
	}
	// handleTimeout(files: VTransmitFile[], message: string, ...args: any[]): void {
	// 	for (const file of files) {
	// 		file.status = UploadStatuses.Timeout
	// 		file.endProgress()
	// 		this.$emit(Events.Timeout, file, message, ...args)
	// 	}
	// 	this.$emit(Events.TimeoutMultiple, files, message, ...args)

	// 	if (this.autoProcessQueue) {
	// 		this.processQueue()
	// 	}
	// }
	handleUploadProgress(files): (e?: ProgressEvent) => void {
		const vm = this
		return function onProgressFn(e?: ProgressEvent): void {
			if (e instanceof ProgressEvent) {
				for (const file of files) {
					file.handleProgress(e)
				}
			} else {
				let allFilesFinished = true
				for (const file of files) {
					if (file.upload.progress !== 100 || file.upload.bytesSent !== file.upload.total) {
						allFilesFinished = false
					}
					file.upload.progress = 100
					file.upload.bytesSent = file.upload.total
					file.endProgress()
				}
				if (allFilesFinished) {
					return
				}
			}

			for (const file of files) {
				vm.$emit(Events.UploadProgress, file, file.upload.progress, file.upload.bytesSent)
			}
		}
	}
	updateTotalUploadProgress(): void {
		const progress = this.activeFiles.reduce(
			(memo, file) => {
				memo.totalBytesSent += file.upload.bytesSent
				memo.totalBytes += file.upload.total
				return memo
			},
			{ totalBytesSent: 0, totalBytes: 0, totalProgress: 100 }
		)

		if (this.activeFiles.length) {
			progress.totalProgress = 100 * progress.totalBytesSent / progress.totalBytes
		}

		this.$emit(Events.TotalUploadProgress, progress)
	}
	uploadFinished(files: VTransmitFile[], response: string | object | any[], ...args: any[]): void {
		for (const file of files) {
			file.status = UploadStatuses.Success
			file.endProgress()
			this.$emit(Events.Success, file, response, ...args)
			this.$emit(Events.Complete, file)
		}

		if (this.uploadMultiple) {
			this.$emit(Events.SuccessMultiple, files, response, ...args)
			this.$emit(Events.CompleteMultiple, files)
		}

		if (this.autoProcessQueue) {
			this.processQueue()
		}
	}
	errorProcessing(files: VTransmitFile[], message: string, xhr?: XMLHttpRequest) {
		for (const file of files) {
			file.status = UploadStatuses.Error
			file.endProgress()
			this.$emit(Events.Error, file, message, xhr)
			this.$emit(Events.Complete, file)
		}

		if (this.uploadMultiple) {
			this.$emit(Events.ErrorMultiple, files, message, xhr)
			this.$emit(Events.CompleteMultiple, files)
		}

		if (this.autoProcessQueue) {
			return this.processQueue()
		}
	}
	isValidFileType(file: VTransmitFile, acceptedFileTypes: string[]): boolean {
		if (!acceptedFileTypes.length) {
			return true
		}
		const mimeType = file.type
		const baseMimeType = mimeType.replace(/\/.*$/, "")
		// Return true on the first condition match,
		// otherwise exhaust all conditions and return false.
		for (let i = 0; i < acceptedFileTypes.length; i++) {
			const validType = acceptedFileTypes[i]
			if (validType.charAt(0) === ".") {
				// Handle extension validation
				// Ensure extension exists at the end of the filename.
				if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
					return true
				}
			} else if (/\/\*$/.test(validType)) {
				// Handle globbed mimetype validation ("image/*")
				if (baseMimeType === validType.replace(/\/.*$/, "")) {
					return true
				}
			} else {
				if (mimeType === validType) {
					return true
				}
			}
		}

		return false
	}
	handleDragStart(e: DragEvent): void {
		this.$emit("drag-start", e)
	}
	handleDragOver(e: DragEvent): void {
		this.dragging = true
		let effect
		try {
			// Handle browser bug
			effect = e.dataTransfer.effectAllowed
		} catch (error) {}
		e.dataTransfer.dropEffect = effect === "move" || effect === "linkMove" ? "move" : "copy"
		this.$emit(Events.DragOver, e)
	}
	handleDragEnter(e: DragEvent): void {
		this.dragging = true
		this.$emit(Events.DragEnter, e)
	}
	handleDragLeave(e: DragEvent): void {
		this.dragging = false
		this.$emit(Events.DragLeave, e)
	}
	handleDragEnd(e: DragEvent): void {
		this.dragging = false
		this.$emit(Events.DragEnd, e)
	}
	handleDrop(e: DragEvent): void {
		this.dragging = false
		if (!e.dataTransfer) {
			return
		}

		let files: File[]
		let items: DataTransferItem[]

		this.$emit(Events.Drop, e)
		this.$emit(Events.AddedFiles, (files = Array.from(e.dataTransfer.files)))

		if (!e.dataTransfer.items) {
			this.handleFiles(files)
			return
		}

		items = Array.from(e.dataTransfer.items)
		if (!items || !items.length || !(items[0].getAsFile || items[0].webkitGetAsEntry)) {
			this.handleFiles(files)
			return
		}

		this.addFilesFromItems(items)
	}
	paste(e: ClipboardEvent): void {
		if (!e || !e.clipboardData || !e.clipboardData.items) {
			return
		}
		this.$emit(Events.Paste, e)
		const items = Array.from(e.clipboardData.items)
		if (items.length) {
			this.addFilesFromItems(items)
		}
	}
	handleFiles(files: File[]): VTransmitFile[] {
		return files.map(this.addFile)
	}
	addFilesFromItems(items: DataTransferItem[]): void {
		let entry: FileSystemEntry
		for (const item of items) {
			// Newer API on standards track
			if (item.getAsFile && item.kind == "file") {
				this.addFile(item.getAsFile())
				continue
			}

			// Vendor prefixed experimental API
			if (item.webkitGetAsEntry) {
				entry = item.webkitGetAsEntry()

				if (entry == null) {
					continue
				}
				if (webkitIsFile(entry)) {
					entry.file(this.addFile as any, console.error)
					continue
				}
				if (webkitIsDir(entry)) {
					this.addFilesFromDirectory(entry, entry.name)
					continue
				}
			}
		}
	}
	addFilesFromDirectory(directory: WebKitDirectoryEntry, path): void {
		directory.createReader().readEntries(
			<any>((entries: FileSystemEntry[]) => {
				for (const entry of entries) {
					if (entry == null) {
						continue
					}
					if (webkitIsDir(entry)) {
						this.addFilesFromDirectory(entry, `${path}/${entry.name}`)
						continue
					}
					if (webkitIsFile(entry)) {
						entry.file(
							<any>((file: File) => {
								if (this.ignoreHiddenFiles && /^\./.test(file.name)) {
									return
								}
								;(file as any).fullPath = `${path}/${file.name}`
								this.addFile(file)
							}),
							console.error
						)
					}
				}
			}),
			console.error
		)
	}

	mounted() {
		this.$on(Events.UploadProgress, this.updateTotalUploadProgress)
		this.$on(Events.RemovedFile, this.updateTotalUploadProgress)
		this.$on(Events.Canceled, file => this.$emit(Events.Complete, file))
		this.$on(Events.Complete, file => {
			if (this.addedFiles.length === 0 && this.uploadingFiles.length === 0 && this.queuedFiles.length === 0) {
				setTimeout(() => this.$emit(Events.QueueComplete, file), 0)
			}
		})

		this.$emit(Events.Initialize, this)
	}
}
</script>
