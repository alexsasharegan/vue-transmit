import { VTransmitFile } from "../classes/VTransmitFile";

let idCounter = 0;
export function uniqueId(prefix: string): string {
  return prefix + ++idCounter;
}

export type Rounding = "round" | "ceil" | "floor" | "trunc";

export function round(
  number: number,
  decimals: number = 2,
  roundStyle: Rounding = "round"
) {
  const roundingFactor = Math.pow(10, decimals);
  return Math[roundStyle](number * roundingFactor) / roundingFactor;
}

export function fromBytesToKbit(bytes: number): number {
  return bytes / 125;
}

export function fromBytesToMbit(bytes: number): number {
  return bytes / 125000;
}

export function toKbps(bytes: number, seconds: number): number {
  return fromBytesToKbit(bytes) / seconds;
}

export function toMbps(bytes: number, seconds: number): number {
  return fromBytesToMbit(bytes) / seconds;
}

export function objFactory() {
  return {};
}

export function noop() {}

export function scaleH(ratio: number, width: number): number {
  return width / ratio;
}

export function scaleW(ratio: number, height: number): number {
  return height * ratio;
}

export enum UploadStatuses {
  None = "",
  Added = "added",
  Queued = "queued",
  Accepted = "queued",
  Uploading = "uploading",
  Canceled = "canceled",
  Error = "error",
  Timeout = "timeout",
  Success = "success",
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
  Paste = "paste",
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 */
export interface DrawImageArgs {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export function resizeImg(
  file: VTransmitFile,
  dims: Dimensions
): DrawImageArgs {
  // 's' variables are for source
  // 'd' variables are for destination
  const sRatio = file.width / file.height;
  const dRatio = dims.width / dims.height;
  const coords: DrawImageArgs = {
    sx: 0,
    sy: 0,
    sWidth: file.width,
    sHeight: file.height,
    dx: 0,
    dy: 0,
    dWidth: dims.width,
    dHeight: dims.height,
  };

  let w, h;
  if (dRatio > sRatio) {
    w = file.width;
    h = scaleH(dRatio, file.width);
  } else {
    w = scaleW(dRatio, file.height);
    h = file.height;
  }

  if (w < file.width) {
    coords.sx = (file.width - w) / 2;
    coords.sWidth = w;
  }
  if (h < file.height) {
    coords.sy = (file.height - h) / 2;
    coords.sHeight = h;
  }

  return coords;
}

export function webkitIsFile(
  entry: WebKitFileEntry | WebKitDirectoryEntry
): entry is WebKitFileEntry {
  return entry.isFile;
}

export function webkitIsDir(
  entry: WebKitFileEntry | WebKitDirectoryEntry
): entry is WebKitDirectoryEntry {
  return entry.isDirectory;
}
