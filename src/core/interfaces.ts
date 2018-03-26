import { VTransmitFile } from "../classes/VTransmitFile";
import { VTransmitUploadContext } from "../classes/VTransmitUploadContext";
import { ErrType } from "../core/utils";

export interface UploadAdapterConstructor<T = any> {
  new (
    context: VTransmitUploadContext,
    options: { [key: string]: any }
  ): UploadAdapterInterface<T>;
}

export interface UploadAdapterInterface<T = any> {
  /**
   * Given a file, cancel it's underlying transport
   * and return a list of affected files
   * (since files can be grouped in transport).
   */
  cancelUpload(file: VTransmitFile): VTransmitFile[];
  uploadFiles(files: VTransmitFile[]): Promise<UploadResult<T>>;
}

export type UploadResult<T> =
  | {
      readonly ok: true;
      data: T;
    }
  | {
      readonly ok: false;
      err: UploadErr;
    };

export type UploadErr = {
  type: ErrType;
  message: string;
  data: any;
};
