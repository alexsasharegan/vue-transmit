import { copyOwnAndInheritedProps, uniqueId, round, toKbps, toMbps } from "../core/utils"
import { UploadStatuses } from "../core/utils"

export interface UploadStats {
	bytesSent: number
	progress: number
	total: number
	speed: SpeedStats
	start: number
	end: number
	time: number
}

export interface SpeedStats {
	kbps: number
	mbps: number
}

export class VTransmitFile {
	private _nativeFile: File = null
	private _dataUrl: string
	public id: string = VTransmitFile.idFactory()
	public accepted: boolean = undefined // Passed all validation.
	public lastModified: number = undefined
	public lastModifiedDate: Date = undefined
	public name: string = undefined
	public processing: boolean = undefined
	public size: number = undefined
	public status: UploadStatuses = undefined
	public type: string = undefined
	public upload: UploadStats = {
		bytesSent: 0,
		progress: 0,
		total: 0,
		speed: {
			kbps: undefined,
			mbps: undefined
		},
		start: undefined,
		end: undefined,
		time: undefined
	}
	public webkitRelativePath: USVString = undefined
	public width: number = undefined
	public height: number = undefined
	public errorMessage: string = undefined
	public adapterData: { [key: string]: any } = {}

	constructor(...data: object[]) {
		Object.assign(this, ...data)
	}

	set(...data: object[]): VTransmitFile {
		return Object.assign(this, ...data)
	}

	copyNativeFile(file: File): VTransmitFile {
		// save reference for upload
		this.nativeFile = file
		// Copy props to normal object for Vue reactivity.
		// Vue cannot define reactive properties on native file's readonly props.
		return this.set(copyOwnAndInheritedProps(file))
	}

	copyOwnAndInheritedProps(...data: object[]): VTransmitFile {
		return this.set(...data.map(copyOwnAndInheritedProps))
	}

	handleProgress(e: ProgressEvent): void {
		this.startProgress()
		const total = e.total || this.upload.total
		this.upload.progress = Math.min(100, 100 * e.loaded / total)
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

	startProgress(): VTransmitFile {
		// Avoid starting twice
		if (typeof this.upload.start !== "number") {
			this.upload.start = Date.now()
		}
		return this
	}

	endProgress(): VTransmitFile {
		// Avoid ending twice
		if (typeof this.upload.end !== "number") {
			this.upload.end = Date.now()
			this.upload.time = (Date.now() - this.upload.start) / 1000
		}
		return this
	}

	get nativeFile() {
		return this._nativeFile
	}

	set nativeFile(file: File) {
		if (!(file instanceof File)) {
			throw new TypeError(`[${VTransmitFile.name}] Expected an instance of File (native).`)
		}
		this._nativeFile = file
		this.upload.total = file.size
	}

	get dataUrl() {
		return this._dataUrl || ""
	}

	set dataUrl(value) {
		// Use non-enumerable data url to avoid copying around large datasets
		Object.defineProperty(this, "_dataUrl", {
			value,
			enumerable: false,
			configurable: true,
			writable: true
		})
	}

	static fromNativeFile(file: File, ...data) {
		const instance = new VTransmitFile(...data)
		instance.copyNativeFile(file)
		return instance
	}

	static idFactory() {
		return uniqueId("v-transmit-file-")
	}
}
