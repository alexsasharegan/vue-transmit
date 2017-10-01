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

<script>
import uniqueId from "lodash-es/uniqueId"
import has from "lodash-es/has"
import noop from "lodash-es/noop"
import props from "../core/props"
import { hbsRegex, hbsReplacer, READY_STATES } from "../core/utils"
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

export default {
  props,
  data() {
    return {
      dragging: false,
      processingThumbnail: false, // Used to keep the createThumbnail calls processing async one-at-a-time
      thumbnailQueue: [],
      clickableElements: [],
      listeners: [],
      files: [],
      defaultHeaders: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      },
      fileInputStyles: {
        visibility: "hidden !important",
        position: "absolute !important",
        top: "0 !important",
        left: "0 !important",
        height: "0px !important",
        width: "0px !important",
      }
    }
  },
  computed: {
    inputEl() {
      return this.$refs.hiddenFileInput
    },
    filesToAccept() {
      return this.acceptedFileTypes.join(",")
    },
    multiple() {
      return this.maxFiles === null || this.maxFiles > 1
    },
    acceptedFiles() {
      return this.files.filter(f => f.accepted)
    },
    rejectedFiles() {
      return this.files.filter(f => !f.accepted)
    },
    addedFiles() {
      return this.getFilesWithStatus(STATUSES.ADDED)
    },
    queuedFiles() {
      return this.getFilesWithStatus(STATUSES.QUEUED)
    },
    uploadingFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING)
    },
    activeFiles() {
      return this.getFilesWithStatus(STATUSES.UPLOADING, STATUSES.QUEUED)
    },
    maxFilesReached() {
      // Loose equality checks null && undefined
      return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles
    },
    maxFilesReachedClass() {
      return this.maxFilesReached ? "v-transmit__max-files--reached" : null
    },
    isDraggingClass() {
      return {
        "v-transmit__upload-area--is-dragging": this.dragging,
        [this.dragClass]: this.dragging,
      }
    },
    isUploading() {
      return this.uploadingFiles.length > 0
    },
    fileSlotBindings() {
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
    },
  },
  watch: {
    acceptedFiles(value) {
      if (this.maxFiles == null) {
        return
      }
      if (value.length >= this.maxFiles) {
        this.$emit('max-files-reached', this.files)
      }
    },
  },
  methods: {
    getFilesWithStatus(...statuses) {
      return this.files.filter(f => statuses.includes(f.status))
    },
    onFileInputChange(e) {
      this.$emit('added-files', Array.from(this.$refs.hiddenFileInput.files).map(this.addFile))
    },
    addFile(file) {
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
    },
    removeFile(file) {
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
    },
    removeAllFiles(cancelInProgressUploads = false) {
      for (const file of files) {
        if (file.status !== STATUSES.UPLOADING || cancelInProgressUploads) {
          this.removeFile(file)
        }
      }
    },
    triggerBrowseFiles() {
      this.inputEl.click()
    },
    handleClickUploaderAction(e) {
      if (this.clickable) {
        this.triggerBrowseFiles()
      }
    },
    enqueueFile(file) {
      if (file.status === STATUSES.ADDED && file.accepted === true) {
        file.status = STATUSES.QUEUED
        if (this.autoProcessQueue) {
          setTimeout(this.processQueue, 0)
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.")
      }
    },
    enqueueThumbnail(file) {
      if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFileSize * 1024 * 1024) {
        this.thumbnailQueue.push(file)
        setTimeout(this.processThumbnailQueue, 0)
      }
    },
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
    },
    createThumbnail(file, callback = noop) {
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
    },
    createThumbnailFromUrl(file, imageUrl, callback, crossOrigin) {
      const $img = document.createElement("img")
      if (crossOrigin) {
        $img.crossOrigin = crossOrigin
      }

      $img.addEventListener("load", () => {
        file.width = $img.width
        file.height = $img.height
        const resizeInfo = this.resize.call(this, file)
        if (!resizeInfo.trgWidth) {
          resizeInfo.trgWidth = resizeInfo.optWidth
        }
        if (!resizeInfo.trgHeight) {
          resizeInfo.trgHeight = resizeInfo.optHeight
        }

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = resizeInfo.trgWidth
        canvas.height = resizeInfo.trgHeight
        ctx.drawImage(
          $img,
          (resizeInfo.srcX || 0),
          (resizeInfo.srcY || 0),
          resizeInfo.srcWidth,
          resizeInfo.srcHeight,
          (resizeInfo.trgX || 0),
          (resizeInfo.trgY || 0),
          resizeInfo.trgWidth,
          resizeInfo.trgHeight
        )
        const thumbnail = canvas.toDataURL("image/png")
        file.dataUrl = thumbnail
        this.$emit("thumbnail", file, thumbnail)

        if (callback) {
          return callback()
        }
      }, false)
      if (callback) {
        $img.addEventListener("error", callback, false)
      }

      return $img.src = imageUrl
    },
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
    },
    processFile(file) {
      return this.processFiles([file])
    },
    processFiles(files) {
      for (const file of files) {
        file.processing = true
        file.status = STATUSES.UPLOADING
        this.$emit("processing", file)
      }
      if (this.uploadMultiple) {
        this.$emit("processing-multiple", files)
      }

      return this.uploadFiles(files)
    },
    getFilesWithXhr(xhr) {
      return this.files.filter(file => file.xhr === xhr)
    },
    cancelUpload(file) {
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
    },
    uploadFile(file) {
      return this.uploadFiles([file])
    },
    /**
     * @param {VTransmitFile[]}
     */
    uploadFiles(files) {
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
    },
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
    },
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
    },
    handleUploadProgress(files) {
      const vm = this
      return function onProgressFn(e) {
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
    },
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
    },
    getParamName(index) {
      return this.paramName + (
        this.uploadMultiple ? `[${index}]` : ''
      )
    },
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
    },
    errorProcessing(files, message, xhr) {
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
    },
    acceptFile(file, done) {
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
    },
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
    },
    /**
     * @param {DragEvent} e
     */
    handleDragStart(e) {
      this.$emit('drag-start', e)
    },
    /**
     * @param {DragEvent} e
     */
    handleDragOver(e) {
      this.dragging = true
      let effect
      try {
        // Handle browser bug
        effect = e.dataTransfer.effectAllowed
      } catch (error) { }
      e.dataTransfer.dropEffect = effect === 'move' || effect === 'linkMove' ? 'move' : 'copy'
      this.$emit('drag-over', e)
    },
    /**
     * @param {DragEvent} e
     */
    handleDragEnter(e) {
      this.dragging = true
      this.$emit('drag-enter', e)
    },
    /**
     * @param {DragEvent} e
     */
    handleDragLeave(e) {
      this.dragging = false
      this.$emit('drag-leave', e)
    },
    /**
     * @param {DragEvent} e
     */
    handleDragEnd(e) {
      this.dragging = false
      this.$emit('drag-end', e)
    },
    /**
     * @param {DragEvent} e
     */
    onDrop(e) {
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
    },
    paste(e) {
      if (!has(e, ['clipboardData', 'items'])) {
        return
      }
      this.$emit("paste", e)
      const items = Array.from(e.clipboardData.items)
      if (items.length) {
        this.addFilesFromItems(items)
      }
    },
    handleFiles(files) {
      return files.map(file => this.addFile(file))
    },
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
    },
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
    },
  },
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
  },
}
</script>
