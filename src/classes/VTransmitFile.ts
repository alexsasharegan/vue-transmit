import {
  assign,
  defineProperty,
  copyOwnAndInheritedProps,
  uniqueId,
  round,
  toKbps,
  toMbps,
} from "../core/utils";

export interface IUploadStats {
  bytesSent: number;
  progress: number;
  total: number;
  speed: ISpeedStats;
  start: number;
  end: number;
  time: number;
}

export interface ISpeedStats {
  kbps: number;
  mbps: number;
}

class VTransmitFile {
  private _nativeFile: File = null;
  id: string = VTransmitFile.idFactory();
  accepted: boolean = undefined; // Passed all validation.
  lastModified: number = undefined;
  lastModifiedDate: Date = undefined;
  name: string = undefined;
  processing: boolean = undefined;
  size: number = undefined;
  status: string = undefined;
  type: string = undefined;
  upload: IUploadStats = {
    bytesSent: 0,
    progress: 0,
    total: 0,
    speed: {
      kbps: undefined,
      mbps: undefined,
    },
    start: undefined,
    end: undefined,
    time: undefined,
  };
  webkitRelativePath: USVString = undefined;
  width: number = undefined;
  height: number = undefined;
  xhr: XMLHttpRequest = undefined;
  private _dataUrl: string;
  errorMessage: string = undefined;
  thumbnailLoaded: boolean = false;
  // When chunked, a reference to the parent VTransmitFile
  originalRef: VTransmitFile | null = null;
  isChunked: boolean = false;
  chunkLength: number = 1;
  chunkIndex: number = 0;

  constructor(...data: object[]) {
    assign(this, ...data);
  }

  set(...data: object[]): VTransmitFile {
    assign(this, ...data);
    return this;
  }

  copyNativeFile(file: File): VTransmitFile {
    // save reference for upload
    this.nativeFile = file;
    // Copy props to normal object for Vue reactivity.
    // Vue cannot define reactive properties on native file's readonly props.
    return this.set(copyOwnAndInheritedProps(file));
  }

  copyOwnAndInheritedProps(...data: object[]): VTransmitFile {
    return this.set(...data.map(copyOwnAndInheritedProps));
  }

  handleProgress(data: { bytesSent: number; totalBytes: number }): void {
    this.startProgress();
    this.upload.progress = Math.min(
      100,
      100 * (data.bytesSent / data.totalBytes)
    );
    this.upload.bytesSent = data.bytesSent;
    this.upload.total = data.totalBytes;
    this.upload.time = (Date.now() - this.upload.start) / 1000;
    // Recalc the upload speed in bytes/sec
    this.upload.speed.kbps = round(
      toKbps(this.upload.bytesSent, this.upload.time)
    );
    this.upload.speed.mbps = round(
      toMbps(this.upload.bytesSent, this.upload.time)
    );
    if (this.upload.progress === 100) {
      this.endProgress();
    }
  }

  handleProgressEvent(e: ProgressEvent): void {
    this.handleProgress({
      bytesSent: e.loaded,
      totalBytes: e.total || this.upload.total,
    });
  }

  startProgress(): VTransmitFile {
    // Avoid starting twice
    if (typeof this.upload.start !== "number") {
      this.upload.start = Date.now();
    }
    return this;
  }

  endProgress(): VTransmitFile {
    // Avoid ending twice
    if (typeof this.upload.end !== "number") {
      this.upload.end = Date.now();
      this.upload.time = (Date.now() - this.upload.start) / 1000;
    }
    return this;
  }

  chunkify(
    maxBytes: number,
    rename: (
      parentFile: VTransmitFile,
      meta: { chunkIndex: number; chunkLength: number }
    ) => string
  ) {
    let chunks: VTransmitFile[] = [];
    let chunkLength = Math.ceil(this.size / maxBytes);

    for (let chunkIndex = 0; chunkIndex < chunkLength; chunkIndex++) {
      let offset = chunkIndex * maxBytes;

      chunks.push(
        VTransmitFile.fromNativeFile(
          new File(
            [this.nativeFile.slice(offset, offset + maxBytes)],
            rename(this, { chunkIndex, chunkLength }),
            {
              type: this.type,
              lastModified: this.lastModified,
            }
          ),
          { chunkIndex, chunkLength, isChunked: true, originalRef: this }
        )
      );
    }

    return chunks;
  }

  get nativeFile() {
    return this._nativeFile;
  }

  set nativeFile(file: File) {
    if (!(file instanceof File)) {
      throw new TypeError(
        `[${VTransmitFile.name}] Expected an instance of File (native).`
      );
    }
    this._nativeFile = file;
    this.upload.total = file.size;
  }

  get dataUrl() {
    return this.thumbnailLoaded ? this._dataUrl : this._dataUrl || "";
  }

  set dataUrl(value) {
    defineProperty(this, "_dataUrl", {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    });
    this.thumbnailLoaded = true;
  }

  static fromNativeFile(file: File, ...data) {
    const instance = new VTransmitFile(...data);
    instance.copyNativeFile(file);
    return instance;
  }

  static idFactory() {
    return uniqueId("v-transmit-file-");
  }
}

export default VTransmitFile;
