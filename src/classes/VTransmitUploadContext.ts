import VueTransmit from "../components/VueTransmit.vue"
import { VTransmitFile } from "./VTransmitFile"
import { UploadStatuses, VTransmitEvents } from "../core/utils"

export class VTransmitUploadContext {
	public Statuses = UploadStatuses
	public Events = VTransmitEvents
	public props: { [key: string]: any }

	constructor(public vtransmit: VueTransmit) {
		this.props = vtransmit.$props
	}

	public emit(event: string, ...args: any[]) {
		this.vtransmit.$emit(event, ...args)
	}

	public get acceptedFiles(): VTransmitFile[] {
		return (this.vtransmit as any).acceptedFiles
	}
	public get rejectedFiles(): VTransmitFile[] {
		return (this.vtransmit as any).rejectedFiles
	}
	public get addedFiles(): VTransmitFile[] {
		return (this.vtransmit as any).addedFiles
	}
	public get queuedFiles(): VTransmitFile[] {
		return (this.vtransmit as any).queuedFiles
	}
	public get uploadingFiles(): VTransmitFile[] {
		return (this.vtransmit as any).uploadingFiles
	}
	public get activeFiles(): VTransmitFile[] {
		return (this.vtransmit as any).activeFiles
	}
}
