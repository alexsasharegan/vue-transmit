import { VTransmitFile } from "../classes/VTransmitFile"

let idCounter = 0
export function uniqueId(prefix: string): string {
	return prefix + ++idCounter
}

export function copyOwnAndInheritedProps(obj: object): object {
	let newData = {}
	for (let prop in obj) {
		if (typeof obj[prop] !== "function") {
			newData[prop] = obj[prop]
		}
	}
	return newData
}

export type Rounding = "round" | "ceil" | "floor" | "trunc"

export function round(number: number, decimals: number = 2, roundStyle: Rounding = "round") {
	const roundingFactor = Math.pow(10, decimals)
	return Math[roundStyle](number * roundingFactor) / roundingFactor
}

export function fromBytesToKbit(bytes: number): number {
	return bytes / 125
}

export function fromBytesToMbit(bytes: number): number {
	return bytes / 125000
}

export function toKbps(bytes: number, seconds: number): number {
	return fromBytesToKbit(bytes) / seconds
}

export function toMbps(bytes: number, seconds: number): number {
	return fromBytesToMbit(bytes) / seconds
}

export function objFactory() {
	return {}
}

export function scaleH(ratio: number, width: number): number {
	return width / ratio
}

export function scaleW(ratio: number, height: number): number {
	return height * ratio
}

export function scaleDims(ratio: number, width?: number, height?: number): number[] {
	return typeof width === "number" ? [width, scaleH(ratio, width)] : [scaleW(ratio, height), height]
}

export enum UploadStatuses {
	Added = "added",
	Queued = "queued",
	Accepted = "queued",
	Uploading = "uploading",
	Canceled = "canceled",
	Error = "error",
	Timeout = "timeout",
	Success = "success"
}

export enum VTransmitEvents {
	Initialize = "initialize",
	AddedFile = "added-file",
	AddedFiles = "added-files",
	RemovedFile = "removed-file",
	AcceptedFile = "accepted-file",
	RejectedFile = "rejected-file",
	AcceptComplete = "accept-complete",
	Thumbnail = "thumbnail",
	Processing = "processing",
	ProcessingMultiple = "processing-multiple",
	Canceled = "canceled",
	CanceledMultiple = "canceled-multiple",
	Sending = "sending",
	SendingMultiple = "sending-multiple",
	Timeout = "timeout",
	TimeoutMultiple = "timeout-multiple",
	UploadProgress = "upload-progress",
	TotalUploadProgress = "total-upload-progress",
	Success = "success",
	SuccessMultiple = "success-multiple",
	QueueComplete = "queue-complete",
	Complete = "complete",
	CompleteMultiple = "complete-multiple",
	Error = "error",
	ErrorMultiple = "error-multiple",
	MaxFilesReached = "max-files-reached",
	MaxFilesExceeded = "max-files-exceeded",
	Reset = "reset",
	DragOver = "drag-over",
	DragEnter = "drag-enter",
	DragLeave = "drag-leave",
	DragEnd = "drag-end",
	Drop = "drop",
	Paste = "paste"
}

export interface DrawImageArgs {
	sx: number
	sy: number
	sWidth: number
	sHeight: number
	dx: number
	dy: number
	dWidth: number
	dHeight: number
}

export interface Dimensions {
	width: number
	height: number
}

export function resizeImg(file: VTransmitFile, dims: Dimensions): DrawImageArgs {
	// Extract the object's primitive values so we don't mutate the input
	const sRatio = file.width / file.height
	const dRatio = dims.width / dims.height
	const imgCoords = {
		sx: 0,
		sy: 0,
		sWidth: file.width,
		sHeight: file.height,
		dx: 0,
		dy: 0,
		dWidth: dims.width,
		dHeight: dims.height
	}

	let w, h
	if (dRatio > sRatio) {
		;[w, h] = scaleDims(dRatio, file.width)
	} else {
		;[w, h] = scaleDims(dRatio, undefined, file.height)
	}

	if (w < file.width) {
		imgCoords.sx = (file.width - w) / 2
		imgCoords.sWidth = w
	}
	if (h < file.height) {
		imgCoords.sy = (file.height - h) / 2
		imgCoords.sHeight = h
	}

	return imgCoords
}

export function webkitIsFile(entry: WebKitFileEntry | WebKitDirectoryEntry): entry is WebKitFileEntry {
	return entry.isFile
}

export function webkitIsDir(entry: WebKitFileEntry | WebKitDirectoryEntry): entry is WebKitDirectoryEntry {
	return entry.isDirectory
}
