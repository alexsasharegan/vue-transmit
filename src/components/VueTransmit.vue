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
         @drop.prevent.stop="onDrop">
      <slot></slot>
    </div>
    <slot name="files"
          v-bind="fileSlotBindings"></slot>
    <input type="file"
           ref="hiddenFileInput"
           :multiple="multiple"
           :style="fileInputStyles"
           :class="[maxFilesReachedClass]"
           :accept="filesToAccept"
           :capture="capture"
           @change="onFileInputChange">
  </component :is="tag">
</template>

<style lang="scss">
  $border-color:#bdbdbd;
  $drop-color:#e1f5fe;
  $drop-color-alt:#fafafa;

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
    background: $drop-color linear-gradient(-45deg, $drop-color-alt 25%, transparent 25%, transparent 50%, $drop-color-alt 50%, $drop-color-alt 75%, transparent 75%, transparent);
    background-size: 40px 40px;
  }
</style>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import noop from "lodash-es/noop"
import identity from "lodash-es/identity"
import {
  READY_STATES,
  hbsRegex,
  hbsReplacer,
  objFactory,
  resizeImg,
  IDrawImageArgs,
  IDimensions,
} from "../core/utils"
import VTransmitFile from "../classes/VTransmitFile"

const STATUSES = {
  ADDED: "added",
  QUEUED: "queued",
  ACCEPTED: "queued",
  UPLOADING: "uploading",
  PROCESSING: "uploading",
  CANCELED: "canceled",
  ERROR: "error",
  TIMEOUT: "timeout",
  SUCCESS: "success",
}

@Component
export default class VueTransmit extends Vue {
  @Prop({ type: String, default: "div" })
  tag: string

  @Prop({ type: [Array, Object, String], default: null })
  uploadAreaClasses: any[] | object | string

  @Prop({ type: Object, default: objFactory })
  uploadAreaAttrs: object

  @Prop({ type: Object, default: objFactory })
  uploadAreaListeners: object

  @Prop({ type: String, default: null })
  dragClass: string

  @Prop({ type: String, required: true })
  url: string

  @Prop({ type: String, default: "post" })
  method: string

  @Prop({ type: Boolean, default: false })
  withCredentials: boolean

  // timeout in milliseconds
  @Prop({ type: Number, default: 0 })
  timeout: number

  @Prop({ type: Number, default: 2 })
  maxConcurrentUploads: number
  // Whether to send multiple files in one request.
  @Prop({ type: Boolean, default: false })
  uploadMultiple: boolean

  // in MB
  @Prop({ type: Number, default: 256 })
  maxFileSize: number

  // The name of the file param that gets transferred.
  @Prop({ type: String, default: "file" })
  paramName: string

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
   * The base that is used to calculate the file size. You can change this to
   * 1024 if you would rather display kibibytes, mebibytes, etc...
   * 1024 is technically incorrect,
   * because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
   * You can change this to `1024` if you don't care about validity.
   */
  @Prop({ type: Number, default: 1000 })
  fileSizeBase: number

  /**
   * Can be used to limit the maximum number of files that will be handled
   * by this Dropzone
   */
  @Prop({ type: Number, default: null })
  maxFiles: number

  /**
   * Can be an object of additional parameters to transfer to the server.
   * This is the same as adding hidden input fields in the form element.
   */
  @Prop({ type: Object, default: objFactory })
  params: object

  @Prop({ type: Object, default: objFactory })
  headers: object

  // If true, the dropzone will present a file selector when clicked.
  @Prop({ type: Boolean, default: true })
  clickable: boolean

  // Whether hidden files in directories should be ignored.
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

  /**
   * Before the file is appended to the formData, the function _renameFilename is performed for file.name, file
   * which executes the function defined in renameFilename
   */
  @Prop({ type: Function, default: identity })
  renameFile: (name: string) => string

  // If the file size is too big.
  @Prop({ type: String, default: "File is too big ({{ fileSize }}MiB). Max file size: {{ maxFileSize }}MB." })
  dictFileTooBig: string

  // If the file doesn't match the file type.
  @Prop({ type: String, default: "You can't upload files of this type." })
  dictInvalidFileType: string

  // If the server response was invalid.
  @Prop({ type: String, default: "Server responded with {{ statusCode }} code." })
  dictResponseError: string

  /**
   * Displayed when the maxFiles have been exceeded
   * You can use {{maxFiles}} here, which will be replaced by the option.
   */
  @Prop({ type: String, default: "You can not upload any more files." })
  dictMaxFilesExceeded: string

  /**
   * If `done()` is called without argument the file is accepted
   * If you call it with an error message, the file is rejected
   * (This allows for asynchronous validation).
   */
  @Prop({ type: Function, default: (_, done: Function) => done() })
  accept: (file: VTransmitFile, done: Function) => void

  @Prop({ type: Function, default: resizeImg })
  resize: (file: VTransmitFile, dims: IDimensions) => IDrawImageArgs

  public dragging: boolean = false
  // Used to keep the createThumbnail calls processing async one-at-a-time
  private processingThumbnail: boolean = false
  public thumbnailQueue: any[] = []
  public files: any[] = []
  public defaultHeaders: object = {
    "Accept": "application/json",
    "Cache-Control": "no-cache",
    "X-Requested-With": "XMLHttpRequest"
  }
  public fileInputStyles: object = {
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
  get filesToAccept() {
    return this.acceptedFileTypes.join(",")
  }
  get multiple() {
    return this.maxFiles === null || this.maxFiles > 1
  }
  get acceptedFiles() {
    return this.files.filter(f => f.accepted)
  }
  get rejectedFiles() {
    return this.files.filter(f => !f.accepted)
  }
  get addedFiles() {
    return this.getFilesWithStatus(STATUSES.ADDED)
  }
  get queuedFiles() {
    return this.getFilesWithStatus(STATUSES.QUEUED)
  }
  get uploadingFiles() {
    return this.getFilesWithStatus(STATUSES.UPLOADING)
  }
  get activeFiles() {
    return this.getFilesWithStatus(STATUSES.UPLOADING, STATUSES.QUEUED)
  }
  get maxFilesReached() {
    // Loose equality checks null && undefined
    return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles
  }
  get maxFilesReachedClass() {
    return this.maxFilesReached ? "v-transmit__max-files--reached" : null
  }
  get isDraggingClass() {
    return {
      "v-transmit__upload-area--is-dragging": this.dragging,
      [this.dragClass]: this.dragging,
    }
  }
  get isUploading() {
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

  @Watch("acceptedFiles")
  onAcceptedFilesChange(acceptedFiles: VTransmitFile[]) {
    if (this.maxFiles == null) {
      return
    }
    if (acceptedFiles.length >= this.maxFiles) {
      this.$emit('max-files-reached', this.files)
    }
  }

  getFilesWithStatus(...statuses: string[]) {
    return this.files.filter(f => statuses.includes(f.status))
  }
  onFileInputChange() {
    this.$emit('added-files', Array.from(this.inputEl.files).map(this.addFile))
  }
  addFile(file: File) {
    const vTransmitFile = VTransmitFile.fromNativeFile(file)
    vTransmitFile.status = STATUSES.ADDED
    this.files.push(vTransmitFile)
    this.$emit("added-file", vTransmitFile)
    this.enqueueThumbnail(vTransmitFile)
    this.acceptFile(vTransmitFile, error => {
      if (error) {
        vTransmitFile.accepted = false
        this.errorProcessing([vTransmitFile], error)
        this.$emit("rejected-file", vTransmitFile)
      } else {
        vTransmitFile.accepted = true
        this.$emit("accepted-file", vTransmitFile)
        if (this.autoQueue) {
          this.enqueueFile(vTransmitFile)
        }
      }
      this.$emit("accept-complete", vTransmitFile)
    })

    return vTransmitFile
  }
  removeFile(file: VTransmitFile) {
    if (file.status === STATUSES.UPLOADING) {
      this.cancelUpload(file)
    }
    const idxToRm = this.files.findIndex(f => f.id === file.id)
    if (~idxToRm) {
      this.$emit("removed-file", this.files.splice(idxToRm, 1)[0])
      if (this.files.length === 0) {
        return this.$emit("reset")
      }
    }
  }
  removeAllFiles(cancelInProgressUploads = false) {
    for (const file of this.files) {
      if (file.status !== STATUSES.UPLOADING || cancelInProgressUploads) {
        this.removeFile(file)
      }
    }
  }
  triggerBrowseFiles() {
    this.inputEl.click()
  }
  handleClickUploaderAction() {
    if (this.clickable) {
      this.triggerBrowseFiles()
    }
  }
  enqueueFile(file: VTransmitFile) {
    if (file.status === STATUSES.ADDED && file.accepted === true) {
      file.status = STATUSES.QUEUED
      if (this.autoProcessQueue) {
        setTimeout(this.processQueue, 0)
      }
    } else {
      throw new Error("This file can't be queued because it has already been processed or was rejected.")
    }
  }
  enqueueThumbnail(file: VTransmitFile) {
    if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFileSize * 1024 * 1024) {
      this.thumbnailQueue.push(file)
      setTimeout(this.processThumbnailQueue, 0)
    }
  }
  processThumbnailQueue() {
    // Employ a chain of self-calling, self-queuing createThumbnail calls
    // so execution can stay as non-blocking as possible.
    if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
      return
    }
    this.processingThumbnail = true
    return this.createThumbnail(this.thumbnailQueue.shift(), () => {
      this.processingThumbnail = false
      return this.processThumbnailQueue()
    })
  }
  createThumbnail(file: VTransmitFile, callback = noop) {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      if (file.type === "image/svg+xml") {
        file.dataUrl = reader.result
        this.$emit("thumbnail", file, reader.result)
        return callback()
      }
      return this.createThumbnailFromUrl(file, reader.result, callback)
    }, false)

    // FileReader requires a native File|Blob object
    return reader.readAsDataURL(file.nativeFile)
  }
  createThumbnailFromUrl(file: VTransmitFile, imageUrl: string, callback?: Function) {
    const imgEl = document.createElement("img")

    imgEl.addEventListener("load", () => {
      file.width = imgEl.width
      file.height = imgEl.height
      const resizeInfo = this.resize(file, {
        width: this.thumbnailWidth,
        height: this.thumbnailHeight
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
      this.$emit("thumbnail", file, thumbnail)

      if (callback) {
        return callback()
      }
    }, false)
    if (callback) {
      imgEl.addEventListener("error", callback, false)
    }

    return imgEl.src = imageUrl
  }
  processQueue() {
    const processingLength = this.uploadingFiles.length
    if (processingLength >= this.maxConcurrentUploads || this.queuedFiles.length === 0) {
      return
    }

    const queuedFiles = [...this.queuedFiles]
    if (this.uploadMultiple) {
      return this.processFiles(queuedFiles.slice(0, this.maxConcurrentUploads - processingLength))
    } else {
      for (let i = processingLength; i < this.maxConcurrentUploads; i++) {
        if (queuedFiles.length) {
          this.processFile(queuedFiles.shift())
        }
      }
    }
  }
  processFile(file: VTransmitFile) {
    return this.processFiles([file])
  }
  processFiles(files: VTransmitFile[]) {
    for (const file of files) {
      file.processing = true
      file.status = STATUSES.UPLOADING
      this.$emit("processing", file)
    }
    if (this.uploadMultiple) {
      this.$emit("processing-multiple", files)
    }

    return this.uploadFiles(files)
  }
  getFilesWithXhr(xhr: XMLHttpRequest) {
    return this.files.filter(file => file.xhr === xhr)
  }
  cancelUpload(file: VTransmitFile) {
    if (file.status === STATUSES.UPLOADING) {
      const groupedFiles = this.getFilesWithXhr(file.xhr)
      file.xhr.abort()
      for (const _file of groupedFiles) {
        _file.status = STATUSES.CANCELED
        this.$emit("canceled", _file)
      }
      if (this.uploadMultiple) {
        this.$emit("canceled-multiple", groupedFiles)
      }
    } else if (file.status === STATUSES.ADDED || file.status === STATUSES.QUEUED) {
      file.status = STATUSES.CANCELED
      this.$emit("canceled", file)
      if (this.uploadMultiple) {
        this.$emit("canceled-multiple", [file])
      }
    }

    if (this.autoProcessQueue) {
      return this.processQueue()
    }
  }
  uploadFile(file: VTransmitFile) {
    return this.uploadFiles([file])
  }
  uploadFiles(files: VTransmitFile[]) {
    let response = null
    const xhr = new XMLHttpRequest()
    xhr.timeout = this.timeout
    for (const file of files) {
      file.xhr = xhr
      file.startProgress()
    }
    xhr.open(this.method, this.url, true)
    xhr.withCredentials = Boolean(this.withCredentials)

    const handleError = this.handleUploadError(files, xhr, response)
    const updateProgress = this.handleUploadProgress(files)
    xhr.addEventListener("error", handleError)
    xhr.upload.addEventListener("progress", updateProgress)
    xhr.addEventListener("timeout", this.handleTimeout(files, xhr))
    xhr.addEventListener("load", e => {
      if (files[0].status === STATUSES.CANCELED || xhr.readyState !== READY_STATES.DONE) {
        return
      }
      response = xhr.responseText
      if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
        if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
          try {
            response = JSON.parse(response)
          } catch (err) {
            response = "Invalid JSON response from server."
          }
        }
      }
      // Called at load (when complete) will enable all the progress done logic.
      updateProgress()
      if (xhr.status < 200 || xhr.status >= 300) {
        return handleError()
      } else {
        return this.uploadFinished(files, response, e)
      }
    })

    // Use null proto obj for the following 'for in' loop
    const headers = Object.assign(Object.create(null), this.defaultHeaders, this.headers)
    for (const headerName in headers) {
      if (headers[headerName]) {
        xhr.setRequestHeader(headerName, headers[headerName])
      }
    }

    const formData = new FormData()
    for (const key in this.params) {
      formData.append(key, this.params[key])
    }

    for (const file of files) {
      this.$emit("sending", file, xhr, formData)
    }
    if (this.uploadMultiple) {
      this.$emit("sending-multiple", files, xhr, formData)
    }

    for (let i = 0; i < files.length; i++) {
      formData.append(this.getParamName(i), files[i].nativeFile, this.renameFile(files[i].name))
    }

    return xhr.send(formData)
  }
  handleUploadError(files, xhr, response) {
    const vm = this
    return function onUploadErrorFn() {
      if (files[0].status !== STATUSES.CANCELED) {
        vm.errorProcessing(
          files,
          response || vm.dictResponseError.replace(hbsRegex, hbsReplacer({ statusCode: xhr.status })),
          xhr
        )
      }
    }
  }
  handleTimeout(files, xhr) {
    const vm = this
    return function onTimeoutFn(e) {
      for (const file of files) {
        file.status = STATUSES.TIMEOUT
        file.endProgress()
        vm.$emit("timeout", file, e, xhr)
      }
      vm.$emit("timeout-multiple", files, e, xhr)

      if (this.autoProcessQueue) {
        return this.processQueue()
      }
    }
  }
  handleUploadProgress(files) {
    const vm = this
    return function onProgressFn(e?: ProgressEvent) {
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
        vm.$emit("upload-progress", file, file.upload.progress, file.upload.bytesSent)
      }
    }
  }
  updateTotalUploadProgress() {
    const progress = this.activeFiles.reduce((memo, file) => {
      memo.totalBytesSent += file.upload.bytesSent
      memo.totalBytes += file.upload.total
      return memo
    }, { totalBytesSent: 0, totalBytes: 0, totalProgress: 100 })

    if (this.activeFiles.length) {
      progress.totalProgress = 100 * progress.totalBytesSent / progress.totalBytes
    }

    this.$emit("total-upload-progress", progress)
  }
  getParamName(index) {
    return this.paramName + (
      this.uploadMultiple ? `[${index}]` : ''
    )
  }
  uploadFinished(files, responseText, e) {
    for (const file of files) {
      file.status = STATUSES.SUCCESS
      file.endProgress()
      this.$emit("success", file, responseText, e)
      this.$emit("complete", file)
    }

    if (this.uploadMultiple) {
      this.$emit("success-multiple", files, responseText, e)
      this.$emit("complete-multiple", files)
    }

    if (this.autoProcessQueue) {
      return this.processQueue()
    }
  }
  errorProcessing(files: VTransmitFile[], message: string, xhr?: XMLHttpRequest) {
    for (const file of files) {
      file.status = STATUSES.ERROR
      file.endProgress()
      this.$emit("error", file, message, xhr)
      this.$emit("complete", file)
    }

    if (this.uploadMultiple) {
      this.$emit("error-multiple", files, message, xhr)
      this.$emit("complete-multiple", files)
    }

    if (this.autoProcessQueue) {
      return this.processQueue()
    }
  }
  acceptFile(file: VTransmitFile, done) {
    if (file.size > this.maxFileSize * 1024 * 1024) {
      return done(
        this.dictFileTooBig
          .replace(hbsRegex, hbsReplacer({
            fileSize: Math.round(file.size / 1024 / 10.24) / 100,
            maxFileSize: this.maxFileSize
          }))
      )
    } else if (!this.isValidFileType(file, this.acceptedFileTypes)) {
      return done(this.dictInvalidFileType)
    } else if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
      done(this.dictMaxFilesExceeded.replace(hbsRegex, hbsReplacer({ maxFiles: this.maxFiles })))
      return this.$emit("max-files-exceeded", file)
    } else {
      // Call the prop callback for the client to validate.
      return this.accept(file, done)
    }
  }
  isValidFileType(file, acceptedFiles) {
    if (!acceptedFiles.length) {
      return true
    }
    const mimeType = file.type
    const baseMimeType = mimeType.replace(/\/.*$/, "")
    // Return true on the first condition match,
    // otherwise exhaust all conditions and return false.
    for (let i = 0; i < acceptedFiles.length; i++) {
      const validType = acceptedFiles[i]
      if (validType.charAt(0) === ".") { // Handle extension validation
        // Ensure extension exists at the end of the filename.
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true
        }
      } else if (/\/\*$/.test(validType)) { // Handle globbed mimetype validation ("image/*")
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
  handleDragStart(e: DragEvent) {
    this.$emit('drag-start', e)
  }
  handleDragOver(e: DragEvent) {
    this.dragging = true
    let effect
    try {
      // Handle browser bug
      effect = e.dataTransfer.effectAllowed
    } catch (error) { }
    e.dataTransfer.dropEffect = effect === 'move' || effect === 'linkMove' ? 'move' : 'copy'
    this.$emit('drag-over', e)
  }
  handleDragEnter(e: DragEvent) {
    this.dragging = true
    this.$emit('drag-enter', e)
  }
  handleDragLeave(e: DragEvent) {
    this.dragging = false
    this.$emit('drag-leave', e)
  }
  handleDragEnd(e: DragEvent) {
    this.dragging = false
    this.$emit('drag-end', e)
  }
  onDrop(e: DragEvent) {
    this.dragging = false
    if (!e.dataTransfer) {
      return
    }
    this.$emit("drop", e)
    const files = Array.from(e.dataTransfer.files)
    this.$emit("added-files", files)
    if (files.length) {
      const items = Array.from(e.dataTransfer.items)
      if (items && items.length && items[0].webkitGetAsEntry) {
        this.addFilesFromItems(items)
      } else {
        this.handleFiles(files)
      }
    }
  }
  paste(e) {
    if (!e || !e.clipboardData || !e.clipboardData.items) {
      return
    }
    this.$emit("paste", e)
    const items = Array.from(e.clipboardData.items)
    if (items.length) {
      this.addFilesFromItems(items)
    }
  }
  handleFiles(files) {
    return files.map(file => this.addFile(file))
  }
  addFilesFromItems(items) {
    for (const item of items) {
      if (item.webkitGetAsEntry) {
        const entry = item.webkitGetAsEntry()

        if (entry.isFile) {
          entry.file(this.addFile)
        } else if (entry.isDirectory) {
          this.addFilesFromDirectory(entry, entry.name)
        }

      } else if (item.getAsFile) {
        if (item.kind === "file") {
          this.addFile(item.getAsFile())
        }
      }
    }
  }
  addFilesFromDirectory(directory, path) {
    directory.createReader().readEntries(entries => {
      for (const entry of entries) {
        if (entry.isFile) {
          entry.file(file => {
            if (this.ignoreHiddenFiles && /^\./.test(file.name)) {
              return
            }
            file.fullPath = `${path}/${file.name}`
            this.addFile(file)
          }, console.error)
        } else if (entry.isDirectory) {
          this.addFilesFromDirectory(entry, `${path}/${entry.name}`)
        }
      }
    }, console.error)
  }

  mounted() {
    this.$on("upload-progress", this.updateTotalUploadProgress)
    this.$on("removed-file", this.updateTotalUploadProgress)
    this.$on("canceled", file => this.$emit("complete", file))
    this.$on("complete", file => {
      if (this.addedFiles.length === 0 && this.uploadingFiles.length === 0 && this.queuedFiles.length === 0) {
        setTimeout(() => this.$emit("queue-complete", file), 0)
      }
    })

    this.$emit('initialize', this)
  }
}
</script>
