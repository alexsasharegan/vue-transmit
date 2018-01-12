import { VTransmitFile } from "../classes/VTransmitFile"
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext"
import { VTransmitEvents } from "../core/utils"

export interface UploaderConstructor {
	new (context: VTransmitUploadContext, options: { [key: string]: any }): UploaderInterface
}

export interface UploaderInterface {
	cancelUpload(file: VTransmitFile): void
	uploadFiles(files: VTransmitFile[]): Promise<any>
}

export type UploadResolve = {
	response: { [key: string]: any }
	[key: string]: any
}
export type UploadReject = {
	type: VTransmitEvents
	message: string
	error?: Error
	[key: string]: any
}
