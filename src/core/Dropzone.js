import defaultOptions from "./default-options"
import dzEvents from "./events"

export class Dropzone {
    constructor(element, options = {}) {
        if (typeof element === "string") {
            element = document.querySelector(element)
        }

        if (!(this.element && this.element.nodeType != null)) {
            throw new Error("Invalid dropzone element.")
        }

        Object.assign(this, {
            element,
            clickableElements: [],
            listeners: [],
            files: []
        })

        this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "")

        if (this.element.dropzone) {
            throw new Error("Dropzone already attached.")
        }

        this.element.dropzone = this
        elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {}
        this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {})

        if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
            return this.options.fallback.call(this)
        }

        if (!this.options.url) {
            this.options.url = this.element.getAttribute("action")
        }

        if (!this.options.url) {
            throw new Error("No URL provided.")
        }

        if (this.options.acceptedMimeTypes) {
            this.options.acceptedFiles = this.options.acceptedMimeTypes
            delete this.options.acceptedMimeTypes
        }

        this.options.method = this.options.method.toUpperCase()

        if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
            fallback.parentNode.removeChild(fallback)
        }

        if (this.options.previewsContainer !== false) {
            if (this.options.previewsContainer) {
                this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer")
            } else {
                this.previewsContainer = this.element
            }
        }

        if (this.options.clickable) {
            if (this.options.clickable === true) {
                this.clickableElements = [this.element]
            } else {
                this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable")
            }
        }

        this.init()
    }

    getAcceptedFiles() {
        return this.files.filter(f => f.accepted)
    }

    getRejectedFiles() {
        return this.files.filter(f => !f.accepted)
    }

    getFilesWithStatus(status) {
        return this.files.filter(f => f.status === status)
    }

    getQueuedFiles() {
        return this.getFilesWithStatus(Dropzone.QUEUED)
    }

    getUploadingFiles() {
        return this.getFilesWithStatus(Dropzone.UPLOADING)
    }

    getAddedFiles() {
        return this.getFilesWithStatus(Dropzone.ADDED)
    }

    static optionsForElement(element) {
        return !!element.getAttribute("id") ? Dropzone.options[this.camelCase(element.getAttribute("id"))] : undefined
    }

    static camelCase(str) {
        return str.replace(/[\-_](\w)/g, match => match.charAt(1).toUpperCase())
    }

    static get ADDED() {
        return "added"
    }

    static get QUEUED() {
        return "queued"
    }

    static get ACCEPTED() {
        return Dropzone.QUEUED
    }

    static get UPLOADING() {
        return "uploading"
    }

    static get PROCESSING() {
        return Dropzone.UPLOADING
    }

    static get CANCELED() {
        return "canceled"
    }

    static get ERROR() {
        return "error"
    }

    static get SUCCESS() {
        return "success"
    }
}
