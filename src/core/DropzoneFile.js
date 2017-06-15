import uniqueId from "lodash-es/uniqueId"

export default class DropzoneFile {
    constructor(...data) {
        Object.assign(this, this.constructor.defaults(), ...data)
    }

    set(...data) {
        Object.assign(this, ...data)

        return this
    }

    copyNativeFile(file) {
        if (file instanceof window.File) {
            // save reference for upload
            this._nativeFile = file
            // copy props to normal object for Vue reactivity
            this.copyOwnAndInheritedProps(file)
        }

        return this
    }

    copyOwnAndInheritedProps(...data) {
        const deepData = data.map(obj => {
            let newData = {}

            for (let prop in obj) {
                if (typeof obj[prop] !== "function") {
                    newData[prop] = obj[prop]
                }
            }

            return newData
        })

        return this.set(...deepData)
    }

    static defaults() {
        return {
            _nativeFile: undefined,
            id: this.idFactory(),
            accepted: undefined,
            height: undefined,
            lastModified: undefined,
            lastModifiedDate: undefined,
            name: undefined,
            previewElement: undefined,
            previewTemplate: undefined,
            processing: undefined,
            size: undefined,
            status: undefined,
            type: undefined,
            upload: undefined,
            webkitRelativePath: undefined,
            width: undefined,
            xhr: undefined,
            dataUrl: undefined,
            errorMessage: undefined
        }
    }

    static fromNativeFile(file, ...data) {
        return new this(...data).copyNativeFile(file)
    }

    static idFactory() {
        return uniqueId("vdz-file-")
    }
}
