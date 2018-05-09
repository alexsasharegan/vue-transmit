import { uniqueId, round, toKbps, toMbps } from "../core/utils";
import { UploadStatuses } from "../core/utils";

export interface UploadStats {
	bytesSent: number;
	progress: number;
	total: number;
	speed: SpeedStats;
	start: number;
	end: number;
	time: number;
}

export interface SpeedStats {
	kbps: number;
	mbps: number;
}

export class VTransmitFile {
	private _dataUrl: string = "";
	/**
	 * The browser native file object obtained from the file input.
	 */
	public nativeFile: File;
	public id: string = VTransmitFile.idFactory();
	public status: UploadStatuses = UploadStatuses.None;
	public accepted: boolean = false; // Passed all validation.
	public lastModified: number;
	public lastModifiedDate: Date;
	public name: string;
	public processing: boolean = false;
	public size: number;
	public type: string;
	public webkitRelativePath: USVString;
	public width: number = 0;
	public height: number = 0;
	public errorMessage: string = "";
	public thumbnailLoaded: boolean = false;

	/**
	 * `adapterData` is data meant for use by an upload adapter only.
	 */
	public driverData: AnyObject = {};
	/**
	 * `meta` is a place to add custom properties.
	 */
	public meta: AnyObject = {};
	public upload: UploadStats = {
		bytesSent: 0,
		progress: 0,
		total: 0,
		speed: {
			kbps: 0,
			mbps: 0,
		},
		start: 0,
		end: 0,
		time: 0,
	};

	constructor(file: File) {
		this.nativeFile = file;
		this.lastModified = file.lastModified;
		this.lastModifiedDate = file.lastModifiedDate;
		this.name = file.name;
		this.size = file.size;
		this.type = file.type;
		this.webkitRelativePath = file.webkitRelativePath;
		this.upload.total = file.size;
	}

	handleProgress(e: ProgressEvent): void {
		this.startProgress();
		const total = e.total || this.upload.total;
		this.upload.progress = Math.min(100, 100 * e.loaded / total);
		this.upload.bytesSent = e.loaded;
		this.upload.total = total;
		this.upload.time = (Date.now() - this.upload.start) / 1000;
		// Recalculate the upload speed in bytes/sec
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

	startProgress(): VTransmitFile {
		// Avoid starting twice
		if (!this.upload.start) {
			this.upload.start = Date.now();
		}
		return this;
	}

	endProgress(): VTransmitFile {
		// Avoid ending twice
		if (!this.upload.end) {
			this.upload.end = Date.now();
			this.upload.time = (Date.now() - this.upload.start) / 1000;
		}
		return this;
	}

	get dataUrl() {
		return this.thumbnailLoaded ? this._dataUrl : "";
	}

	set dataUrl(value) {
		// Use non-enumerable data url to avoid copying around large data sets
		Object.defineProperty(this, "_dataUrl", {
			value,
			enumerable: false,
			configurable: true,
			writable: true,
		});
		this.thumbnailLoaded = true;
	}

	static idFactory() {
		return uniqueId("vt_");
	}
}
