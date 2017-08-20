import { assign, copyOwnAndInheritedProps, uniqueId, round, toKbps, toMbps } from "@core/utils"

export default class VTransmitFile {
  constructor(...data) {
    assign(this, this.constructor.defaults(), ...data)
  }

  set(...data) {
    assign(this, ...data)
    return this
  }

  copyNativeFile(file) {
    if (!(file instanceof window.File)) {
      throw new TypeError("The method 'copyNativeFile' expects an instance of File (Native).")
    }
    // save reference for upload
    this._nativeFile = file
    // Copy props to normal object for Vue reactivity.
    // Vue cannot define reactive properties on native file's readonly props.
    return this.set(copyOwnAndInheritedProps(file))
  }

  copyOwnAndInheritedProps(...data) {
    return this.set(...data.map(copyOwnAndInheritedProps))
  }

  handleProgress(e) {
    if (!(e instanceof ProgressEvent)) {
      throw new TypeError(
        `'${this.constructor.name}.prototype.handleProgress' can only be called with the 'ProgressEvent' object.`
      )
    }
    this.startProgress()
    const total = Math.max(e.total, this.upload.total)
    this.upload.progress = 100 * e.loaded / total
    this.upload.bytesSent = e.loaded
    this.upload.total = total
    this.upload.time = (Date.now() - this.upload.start) / 1000
    // Recalc the upload speed in bytes/sec
    this.upload.speed.kbps = round(toKbps(this.upload.bytesSent, this.upload.time))
    this.upload.speed.mbps = round(toMbps(this.upload.bytesSent, this.upload.time))
    if (this.upload.progress === 100) {
      this.endProgress()
    }
  }

  startProgress() {
    // Avoid starting twice
    if (typeof this.upload.start !== "number") {
      this.upload.start = Date.now()
    }
  }

  endProgress() {
    // Avoid ending twice
    if (typeof this.upload.end !== "number") {
      this.upload.end = Date.now()
      this.upload.time = (Date.now() - this.upload.start) / 1000
    }
  }

  /**
   * @return {File|null}
   */
  get nativeFile() {
    return this._nativeFile
  }

  static defaults() {
    return {
      _nativeFile: null,
      id: VTransmitFile.idFactory(),
      accepted: undefined, // Passed all validation.
      lastModified: undefined,
      lastModifiedDate: undefined,
      name: undefined,
      previewElement: undefined,
      previewTemplate: undefined,
      processing: undefined,
      size: undefined,
      status: undefined,
      type: undefined,
      upload: {
        bytesSent: 0,
        progress: 0,
        speed: {
          kbps: undefined,
          mbps: undefined
        },
        start: undefined,
        end: undefined,
        time: undefined
      },
      webkitRelativePath: undefined,
      width: undefined,
      height: undefined,
      xhr: undefined,
      dataUrl: undefined,
      errorMessage: undefined,
      VERSION: VERSION
    }
  }

  static fromNativeFile(file, ...data) {
    const instance = new VTransmitFile(...data)
    instance.copyNativeFile(file)
    instance.upload.total = file.size
    return instance
  }

  static idFactory() {
    return uniqueId("v-transmit-file-")
  }
}
