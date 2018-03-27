import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { DriverInterface, UploadResult } from "../core/interfaces";
import {
  VTransmitEvents as Events,
  UploadStatuses as Statuses,
  ErrType,
  is_function,
} from "../core/utils";
import Firebase from "firebase";

export type StaticOrDynamic<T> = T | ((files: VTransmitFile[]) => T);

export interface FirebaseUploadOptions {
  storageRef: StaticOrDynamic<Firebase.storage.Reference>;
}

export class FirebaseDriver implements DriverInterface {
  constructor(
    public context: VTransmitUploadContext,
    public options: FirebaseUploadOptions
  ) {}

  cancelUpload(file: VTransmitFile): VTransmitFile[] {
    throw new Error("Method not implemented.");
  }
  uploadFiles(files: VTransmitFile[]): Promise<UploadResult<any>> {
    throw new Error("Method not implemented.");
  }
}
