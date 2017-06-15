<template>
    <div>
        <div class="uploader-action"
             @click="handleClickUploaderAction">
            <!---->
        </div>
        <div class="hidden-input-container">
            <input type="file"
                   ref="hiddenFileInput"
                   :multiple="uploadMultiple"
                   class="dz-hidden-input"
                   :class="[maxFilesReachedClass]"
                   :accept="filesToAccept"
                   @change="onFileInputChange">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .dz-hidden-input {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        height: 0px;
        width: 0px;
    }
</style>

<script>
import uniqueId from 'lodash-es/uniqueId'
import has from 'lodash-es/has'
import noop from 'lodash-es/noop'
import DropzoneFile from './core/DropzoneFile'
import Dropzone from './core/Dropzone'
import props from './core/props'

const hbsRegex = /{{\s*?([a-zA-Z]+)\s*?}}/g
const hbsReplacer = (context = {}) => (match, capture) => context[capture] ? context[capture] : match

export default {
    components: {},

    props,

    data() {
        return {
            processingThumbnail: false,
            thumbnailQueue: [],
            clickableElements: [],
            listeners: [],
            files: [],
        }
    },

    computed: {
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
            return this.getFilesWithStatuses(Dropzone.ADDED)
        },

        queuedFiles() {
            return this.getFilesWithStatuses(Dropzone.QUEUED)
        },

        uploadingFiles() {
            return this.getFilesWithStatuses(Dropzone.UPLOADING)
        },

        activeFiles() {
            return this.getFilesWithStatuses(Dropzone.UPLOADING, Dropzone.QUEUED)
        },

        maxFilesReached() {
            return this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles
        },

        maxFilesReachedClass() {
            return this.maxFilesReached ? 'dz-max-files-reached' : null
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
        getFilesWithStatuses(...statuses) {
            return this.files.filter(f => statuses.includes(f.status))
        },

        onFileInputChange(e) {
            const files = Array.from(this.$refs.hiddenFileInput.files).map(f => this.addFile(f))

            this.$emit('added-files', files)
        },

        addFile(file) {
            const vdzFile = DropzoneFile.fromNativeFile(file, {
                upload: {
                    progress: 0,
                    total: file.size,
                    bytesSent: 0
                }
            })

            this.files.push(vdzFile)
            vdzFile.status = Dropzone.ADDED

            this.$emit("added-file", file)
            this.enqueueThumbnail(file)

            return this.vdzAccept(vdzFile, error => {
                if (error) {
                    vdzFile.accepted = false
                    this.errorProcessing([vdzFile], error)
                } else {
                    vdzFile.accepted = true

                    if (this.autoQueue) {
                        this.enqueueFile(vdzFile)
                    }
                }

                return vdzFile
            })
        },

        removeFile(file) {
            if (file.status === Dropzone.UPLOADING) {
                this.cancelUpload(file)
            }

            this.files = this.files.filter(f => f.id === file.id)
            this.$emit("removed-file", file)

            if (this.files.length === 0) {
                return this.$emit("reset")
            }
        },

        removeAllFiles(cancelInProgressUploads = false) {
            this.files.forEach(file => {
                if (file.status !== Dropzone.UPLOADING || cancelInProgressUploads) {
                    this.removeFile(file)
                }
            })
        },

        handleClickUploaderAction(e) {
            //
        },

        enqueueFile(file) {
            if (file.status === Dropzone.ADDED && file.accepted === true) {
                file.status = Dropzone.QUEUED

                if (this.autoProcessQueue) {
                    setTimeout(this.processQueue, 0)
                }
            } else {
                throw new Error("This file can't be queued because it has already been processed or was rejected.")
            }
        },

        enqueueThumbnail(file) {
            if (this.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.maxThumbnailFilesize * 1024 * 1024) {
                this.thumbnailQueue.push(file)

                setTimeout(this.processThumbnailQueue, 0)
            }
        },

        processThumbnailQueue() {
            if (this.processingThumbnail || this.thumbnailQueue.length === 0) {
                return
            }

            this.processingThumbnail = true

            return this.createThumbnail(this.thumbnailQueue.shift(), () => {
                this.processingThumbnail = false
                return this.processThumbnailQueue()
            })
        },

        createThumbnail(file, cb = noop) {
            const fileReader = new FileReader()

            fileReader.onload = () => {
                if (file.type === "image/svg+xml") {
                    this.$emit("thumbnail", file, fileReader.result)

                    return cb()
                }

                return this.createThumbnailFromUrl(file, fileReader.result, cb)
            }

            return fileReader.readAsDataURL(file)
        },

        createThumbnailFromUrl(file, imageUrl, cb, crossOrigin) {
            const $img = document.createElement("img")

            if (crossOrigin) {
                $img.crossOrigin = crossOrigin
            }

            $img.onload = () => {
                const resizeInfo = this.resize(file)

                file.width = $img.width
                file.height = $img.height

                if (!resizeInfo.trgWidth) {
                    resizeInfo.trgWidth = resizeInfo.optWidth
                }

                if (!resizeInfo.trgHeight) {
                    resizeInfo.trgHeight = resizeInfo.optHeight
                }

                canvas = document.createElement("canvas")
                ctx = canvas.getContext("2d")
                canvas.width = resizeInfo.trgWidth
                canvas.height = resizeInfo.trgHeight
                ctx.drawImage(
                    img,
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
                this.$emit("thumbnail", file, thumbnail)

                if (cb) {
                    return cb()
                }
            }

            if (cb) {
                $img.onerror = cb
            }

            return $img.src = imageUrl
        },

        processQueue() {
            const parallelUploads = this.parallelUploads
            const processingLength = this.uploadingFiles().length

            if (processingLength >= parallelUploads) {
                return
            }

            const queuedFiles = [...this.queuedFiles]

            if (queuedFiles.length === 0) {
                return
            }

            if (this.uploadMultiple) {
                return this.processFiles(this.queuedFiles.slice(0, parallelUploads - processingLength))
            } else {
                for (let i = processingLength; i < parellelUploads; i++) {
                    if (!queuedFiles.length) {
                        return
                    }
                    this.processFile(queuedFiles.shift())
                }
            }
        },

        processFile(file) {
            return this.processFiles([file])
        },

        processFiles(files) {
            files.forEach(file => {
                file.processing = true
                file.status = Dropzone.UPLOADING
                this.$emit("processing", file)
            })

            if (this.uploadMultiple) {
                this.$emit("processing-multiple", files)
            }

            return this.uploadFiles(files)
        },

        getFilesWithXhr(xhr) {
            return this.files.filter(file => file.xhr === xhr)
        },

        cancelUpload(file) {
            if (file.status === Dropzone.UPLOADING) {
                const groupedFiles = this.getFilesWithXhr(file.xhr)

                file.xhr.abort()

                groupedFiles.forEach(file => {
                    file.status = Dropzone.CANCELED
                    this.$emit("canceled", file)
                })

                if (this.uploadMultiple) {
                    this.$emit("canceled-multiple", groupedFiles)
                }
            } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
                file.status = Dropzone.CANCELED
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

        uploadFiles(files) {
            const xhr = new XMLHttpRequest()
            xhr.timeout = this.timeout

            files.forEach(file => file.xhr = xhr)

            xhr.open(this.method, this.url, true)
            xhr.withCredentials = this.withCredentials

            let response = null

            const handleError = () => files.map(this.errorProcessing(files, (response || this.dictResponseError.replace(hbsRegex, hbsReplacer({ statusCode: xhr.status }))), xhr))
            const updateProgress = (e) => {
                let progress = 0

                if (e) {
                    progress = 100 * e.loaded / e.total
                    files.forEach(file => Object.assign(file, {
                        upload: {
                            progress: progress,
                            total: e.total,
                            bytesSent: e.loaded
                        }
                    }))
                } else {
                    let allFilesFinished = true
                    progress = 100

                    files.forEach(file => {
                        if (file.upload.progress !== 100 || file.upload.bytesSent !== file.upload.total) {
                            allFilesFinished = false
                        }

                        file.upload.progress = progress
                        file.upload.bytesSent = file.upload.total
                    })

                    if (allFilesFinished) {
                        return
                    }
                }

                files.forEach(file => this.$emit("upload-progress", file, progress, file.upload.bytesSent))
            }

            xhr.onload = (e) => {
                if (files[0].status === Dropzone.CANCELED || xhr.readyState !== 4) {
                    return
                }

                let response = xhr.responseText

                if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
                    try {
                        response = JSON.parse(response)
                    } catch (err) {
                        response = "Invalid JSON response from server."
                    }
                }

                updateProgress()

                if (xhr.status < 200 || xhr.status >= 300) {
                    return handleError()
                } else {
                    return this.finished(files, response, e)
                }
            }

            xhr.onerror = () => {
                if (files[0].status === Dropzone.CANCELED) {
                    return
                }

                return handleError()
            }

            const progressTarget = xhr.upload ? xhr.upload : xhr
            progressTarget.onprogress = updateProgress

            const headers = Object.assign({
                "Accept": "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            }, this.headers)

            for (headerName in headers) {
                if (headers[headerName]) {
                    xhr.setRequestHeader(headerName, headers[headerName])
                }
            }

            const formData = new FormData()

            for (key in this.params) {
                formData.append(key, this.params[key])
            }

            files.forEach(file => this.$emit("sending", file, xhr, formData))

            if (this.uploadMultiple) {
                this.$emit("sending-multiple", files, xhr, formData)
            }

            files.forEach((file, i) => formData.append(this.getParamName(i), file._nativeFile, this.renameFile(file.name)))

            return xhr.send(formData)
        },

        getParamName(index) {
            return this.paramName + (
                this.uploadMultiple ? `[${index}]` : ''
            )
        },

        finished(files, responseText, e) {
            files.forEach(file => {
                file.status = Dropzone.SUCCESS
                this.$emit("success", file, responseText, e)
                this.$emit("complete", file)
            })

            if (this.uploadMultiple) {
                this.$emit("success-multiple", files, responseText, e)
                this.$emit("complete-multiple", files)
            }

            if (this.autoProcessQueue) {
                return this.processQueue()
            }
        },

        errorProcessing(files, message, xhr) {
            files.forEach(file => {
                file.status = Dropzone.ERROR
                this.$emit("error", file, message, xhr)
                this.$emit("complete", file)
            })

            if (this.uploadMultiple) {
                this.$emit("error-multiple", files, message, xhr)
                this.$emit("complete-multiple", files)
            }

            if (this.autoProcessQueue) {
                return this.processQueue()
            }
        },

        vdzAccept(file, done) {
            if (file.size > this.maxFileSize * 1024 * 1024) {
                return done(
                    this.dictFileTooBig
                        .replace(hbsRegex, hbsReplacer({
                            fileSize: Math.round(file.size / 1024 / 10.24) / 100,
                            maxFileSize: this.maxFilesize
                        }))
                )
            } else if (!Dropzone.isValidFile(file, this.acceptedFileTypes)) {

                return done(this.dictInvalidFileType)

            } else if (this.maxFiles != null && this.acceptedFiles.length >= this.maxFiles) {
                done(this.dictMaxFilesExceeded.replace(hbsRegex, hbsReplacer({ maxFiles: this.maxFiles })))

                return this.$emit("max-files-exceeded", file)
            } else {

                return this.accept(file, done)
            }
        },

        isValidFile(file, acceptedFiles) {
            if (!acceptedFiles.length) {
                return true
            }

            const mimeType = file.type
            const baseMimeType = mimeType.replace(/\/.*$/, "")

            for (let i = 0; i < acceptedFiles.length; i++) {
                const validType = acceptedFiles[i]

                if (validType.charAt(0) === ".") {
                    if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                        return true
                    }
                } else if (/\/\*$/.test(validType)) {
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

        drop(e) {
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
            items.forEach(item => {
                if (item.webkitGetAsEntry) {
                    const entry = item.webkitGetAsEntry()

                    if (entry.isFile) {
                        this.addFile(entry.getAsFile())
                    } else if (entry.isDirectory) {
                        this.addFilesFromDirectory(entry, entry.name)
                    }

                } else if (item.getAsFile) {
                    if (item.kind === "file") {
                        this.addFile(item.getAsFile())
                    }
                }
            })
        },

        addFilesFromDirectory(directory, path) {
            directory.createReader().readEntries(entries => {
                entries.forEach(entry => {
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
                })
            }, console.error)
        },
    },

    mounted() {
        this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL
        this.on("uploadprogress", (function (this) {
            return function () {
                return this.updateTotalUploadProgress()
            }
        })(this))
        this.on("removedfile", (function (this) {
            return function () {
                return this.updateTotalUploadProgress()
            }
        })(this))
        this.on("canceled", (function (this) {
            return function (file) {
                return this.$emit("complete", file)
            }
        })(this))
        this.on("complete", (function (this) {
            return function (file) {
                if (this.addedFiles.length === 0 && this.uploadingFiles.length === 0 && this.queuedFiles.length === 0) {
                    return setTimeout((function () {
                        return this.$emit("queuecomplete")
                    }), 0)
                }
            }
        })(this))
        noPropagation = function (e) {
            e.stopPropagation()
            if (e.preventDefault) {
                return e.preventDefault()
            } else {
                return e.returnValue = false
            }
        }
        this.listeners = [
            {
                element: this.element,
                events: {
                    "dragstart": (function (this) {
                        return function (e) {
                            return this.$emit("dragstart", e)
                        }
                    })(this),
                    "dragenter": (function (this) {
                        return function (e) {
                            noPropagation(e)
                            return this.$emit("dragenter", e)
                        }
                    })(this),
                    "dragover": (function (this) {
                        return function (e) {
                            var efct
                            try {
                                efct = e.dataTransfer.effectAllowed
                            } catch (_error) { }
                            e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy'
                            noPropagation(e)
                            return this.$emit("dragover", e)
                        }
                    })(this),
                    "dragleave": (function (this) {
                        return function (e) {
                            return this.$emit("dragleave", e)
                        }
                    })(this),
                    "drop": (function (this) {
                        return function (e) {
                            noPropagation(e)
                            return this.drop(e)
                        }
                    })(this),
                    "dragend": (function (this) {
                        return function (e) {
                            return this.$emit("dragend", e)
                        }
                    })(this)
                }
            }
        ]
        this.clickableElements.forEach((function (this) {
            return function (clickableElement) {
                return this.listeners.push({
                    element: clickableElement,
                    events: {
                        "click": function (evt) {
                            if ((clickableElement !== this.element) || (evt.target === this.element || Dropzone.elementInside(evt.target, this.element.querySelector(".dz-message")))) {
                                this.hiddenFileInput.click()
                            }
                            return true
                        }
                    }
                })
            }
        })(this))
        this.enable()

        this.$emit('initialize', this)
    },

}
</script>
