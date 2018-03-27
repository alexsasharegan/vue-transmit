import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { ErrType } from "../core/utils";

export interface DriverConstructor<T = any> {
  new (
    context: VTransmitUploadContext,
    options: { [key: string]: any }
  ): DriverInterface<T>;
}

export interface DriverInterface<T = any> {
  /**
   * Given a file, cancel it's underlying transport
   * and return a list of affected files
   * (since files can be grouped in transport).
   */
  cancelUpload(file: VTransmitFile): VTransmitFile[];
  uploadFiles(files: VTransmitFile[]): Promise<UploadResult<T>>;
}

export type UploadResultOk<T> = {
  readonly ok: true;
  data: T;
};

export type UploadResultErr = {
  readonly ok: false;
  err: UploadErr;
};

export type UploadResult<T> = UploadResultOk<T> | UploadResultErr;

export type UploadErr = {
  type: ErrType;
  message: string;
  data: any;
};
