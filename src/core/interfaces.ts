import { VTransmitFile } from "../classes/VTransmitFile"
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext"
import { VTransmitEvents } from "../core/utils"

export interface UploaderConstructor {
	new (
		context: VTransmitUploadContext,
		options: { [key: string]: any }
	): UploaderInterface
}

export interface UploaderInterface {
	/**
	 * Given a file, cancel it's underlying transport
	 * and return a list of affected files (since files can be grouped in transport).
	 */
	cancelUpload(file: VTransmitFile): VTransmitFile[]
	uploadFiles(files: VTransmitFile[]): Promise<UploadResolve>
}

export type UploadResolve = {
	[key: string]: any
}
export type UploadReject = {
	event: VTransmitEvents
	message: string
	error?: Error
	[key: string]: any
}
