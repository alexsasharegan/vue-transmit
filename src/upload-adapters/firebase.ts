import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import {
	DriverInterface,
	UploadResult,
	UploadResultOk,
} from "../core/interfaces";
import {
	// ErrType,
	VTransmitEvents,
} from "../core/utils";
import firebase from "firebase";

export interface FirebaseUploadOptions {
	storageRef: (file: VTransmitFile) => firebase.storage.Reference;
	metadata?: (file: VTransmitFile) => firebase.storage.UploadMetadata;
}

export class FirebaseDriver implements DriverInterface {
	public cancelTokens: { [id: string]: () => any } = Object.create(null);

	constructor(
		public context: VTransmitUploadContext,
		public options: FirebaseUploadOptions
	) {}

	cancelUpload(file: VTransmitFile): VTransmitFile[] {
		let cancel = this.cancelTokens[file.id];
		if (cancel) {
			cancel();
			delete this.cancelTokens[file.id];
			this.context.emit(VTransmitEvents.Canceled, file);
			return [file];
		}

		return [];
	}

	uploadFiles(files: VTransmitFile[]): Promise<UploadResult<any>> {
		console.log("firebase upload", { files });
		const ps: Promise<any>[] = [];

		for (let i = 0, len = files.length; i < len; i++) {
			let file = files[i];
			ps.push(
				new Promise(resolve => {
					let ref = this.options.storageRef(file);
					let metadata = this.options.metadata
						? this.options.metadata(file)
						: undefined;
					let task = ref.put(files[i].nativeFile, metadata);
					this.cancelTokens[file.id] = () => task.cancel();
					task.on(firebase.storage.TaskEvent.STATE_CHANGED, {
						complete: () => {
							delete this.cancelTokens[file.id];
							resolve();
						},
						next: snapshot => {
							this.context.emit(
								VTransmitEvents.UploadProgress,
								file,
								snapshot.bytesTransferred / snapshot.totalBytes * 100,
								snapshot.bytesTransferred
							);
						},
						error: console.error,
					});
				})
			);
		}

		return Promise.all(ps).then(
			() => <UploadResultOk<{}>>{ ok: true, data: {} }
		);
	}
}
