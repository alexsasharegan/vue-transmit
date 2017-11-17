import Vue from "vue";
import { IDrawImageArgs, IDimensions } from "../core/utils";
import VTransmitFile from "../classes/VTransmitFile";
export default class VueTransmit extends Vue {
    tag: string;
    uploadAreaClasses: any[] | object | string;
    uploadAreaAttrs: object;
    uploadAreaListeners: object;
    dragClass: string;
    url: string;
    method: string;
    withCredentials: boolean;
    timeout: number;
    maxConcurrentUploads: number;
    uploadMultiple: boolean;
    maxFileSize: number;
    paramName: string;
    createImageThumbnails: boolean;
    maxThumbnailFileSize: number;
    thumbnailWidth: number;
    thumbnailHeight: number;
    /**
     * The base that is used to calculate the file size. You can change this to
     * 1024 if you would rather display kibibytes, mebibytes, etc...
     * 1024 is technically incorrect,
     * because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
     * You can change this to `1024` if you don't care about validity.
     */
    fileSizeBase: number;
    /**
     * Can be used to limit the maximum number of files that will be handled
     * by this Dropzone
     */
    maxFiles: number;
    /**
     * Can be an object of additional parameters to transfer to the server.
     * This is the same as adding hidden input fields in the form element.
     */
    params: object;
    headers: object;
    clickable: boolean;
    ignoreHiddenFiles: boolean;
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
    acceptedFileTypes: string[];
    /**
     * If false, files will be added to the queue but the queue will not be
     * processed automatically.
     * This can be useful if you need some additional user input before sending
     * files (or if you want want all files sent at once).
     * If you're ready to send the file simply call myDropzone.processQueue()
     */
    autoProcessQueue: boolean;
    /**
     * If false, files added to the dropzone will not be queued by default.
     * You'll have to call `enqueueFile(file)` manually.
     */
    autoQueue: boolean;
    /**
     * If null, no capture type will be specified
     * If camera, mobile devices will skip the file selection and choose camera
     * If microphone, mobile devices will skip the file selection and choose the microphone
     * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
     * On apple devices multiple must be set to false.  AcceptedFiles may need to
     * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
     */
    capture: string;
    /**
     * Before the file is appended to the formData, the function _renameFilename is performed for file.name, file
     * which executes the function defined in renameFilename
     */
    renameFile: (name: string) => string;
    dictFileTooBig: string;
    dictInvalidFileType: string;
    dictResponseError: string;
    /**
     * Displayed when the maxFiles have been exceeded
     * You can use {{maxFiles}} here, which will be replaced by the option.
     */
    dictMaxFilesExceeded: string;
    /**
     * If `done()` is called without argument the file is accepted
     * If you call it with an error message, the file is rejected
     * (This allows for asynchronous validation).
     */
    accept: (file: VTransmitFile, done: Function) => void;
    resize: (file: VTransmitFile, dims: IDimensions) => IDrawImageArgs;
    dragging: boolean;
    private processingThumbnail;
    thumbnailQueue: any[];
    files: VTransmitFile[];
    defaultHeaders: object;
    fileInputStyles: object;
    readonly inputEl: HTMLInputElement;
    readonly filesToAccept: string;
    readonly multiple: boolean;
    readonly acceptedFiles: VTransmitFile[];
    readonly rejectedFiles: VTransmitFile[];
    readonly addedFiles: VTransmitFile[];
    readonly queuedFiles: VTransmitFile[];
    readonly uploadingFiles: VTransmitFile[];
    readonly activeFiles: VTransmitFile[];
    readonly maxFilesReached: boolean;
    readonly maxFilesReachedClass: string;
    readonly isDraggingClass: {
        [key: string]: boolean;
    };
    readonly isUploading: boolean;
    readonly fileSlotBindings: {
        files: VTransmitFile[];
        acceptedFiles: VTransmitFile[];
        rejectedFiles: VTransmitFile[];
        addedFiles: VTransmitFile[];
        queuedFiles: VTransmitFile[];
        uploadingFiles: VTransmitFile[];
        activeFiles: VTransmitFile[];
        isUploading: boolean;
    };
    onAcceptedFilesChange(acceptedFiles: VTransmitFile[]): void;
    getFilesWithStatus(...statuses: string[]): VTransmitFile[];
    onFileInputChange(): void;
    addFile(file: File): VTransmitFile;
    removeFile(file: VTransmitFile): void;
    removeAllFiles(cancelInProgressUploads?: boolean): void;
    triggerBrowseFiles(): void;
    handleClickUploaderAction(): void;
    enqueueFile(file: VTransmitFile): void;
    enqueueThumbnail(file: VTransmitFile): void;
    processThumbnailQueue(): void;
    createThumbnail(file: VTransmitFile, callback?: any): void;
    createThumbnailFromUrl(file: VTransmitFile, imageUrl: string, callback?: Function): void;
    processQueue(): void;
    processFile(file: VTransmitFile): void;
    processFiles(files: VTransmitFile[]): void;
    getFilesWithXhr(xhr: XMLHttpRequest): VTransmitFile[];
    cancelUpload(file: VTransmitFile): void;
    uploadFile(file: VTransmitFile): void;
    uploadFiles(files: VTransmitFile[]): void;
    handleUploadError(files: VTransmitFile[], xhr: XMLHttpRequest): () => void;
    handleTimeout(files: VTransmitFile[], xhr: XMLHttpRequest): (e: Event) => void;
    handleUploadProgress(files: any): (e?: ProgressEvent) => void;
    updateTotalUploadProgress(): void;
    getParamName(index: any): string;
    uploadFinished(files: VTransmitFile[], response: string | object | any[], e: Event): void;
    errorProcessing(files: VTransmitFile[], message: string, xhr?: XMLHttpRequest): void;
    acceptFile(file: VTransmitFile, done: Function): void;
    isValidFileType(file: VTransmitFile, acceptedFileTypes: string[]): boolean;
    handleDragStart(e: DragEvent): void;
    handleDragOver(e: DragEvent): void;
    handleDragEnter(e: DragEvent): void;
    handleDragLeave(e: DragEvent): void;
    handleDragEnd(e: DragEvent): void;
    handleDrop(e: DragEvent): void;
    paste(e: ClipboardEvent): void;
    handleFiles(files: File[]): VTransmitFile[];
    addFilesFromItems(items: DataTransferItem[]): void;
    addFilesFromDirectory(directory: WebKitDirectoryEntry, path: any): void;
    mounted(): void;
}
