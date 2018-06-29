export interface IUploadStats {
    bytesSent: number;
    progress: number;
    total: number;
    speed: ISpeedStats;
    start: number;
    end: number;
    time: number;
}
export interface ISpeedStats {
    kbps: number;
    mbps: number;
}
declare class VTransmitFile {
    private _nativeFile;
    id: string;
    accepted: boolean;
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    processing: boolean;
    size: number;
    status: string;
    type: string;
    upload: IUploadStats;
    webkitRelativePath: USVString;
    width: number;
    height: number;
    xhr: XMLHttpRequest;
    private _dataUrl;
    errorMessage: string;
    thumbnailLoaded: boolean;
    originalRef: VTransmitFile | null;
    isChunked: boolean;
    chunkLength: number;
    chunkIndex: number;
    constructor(...data: object[]);
    set(...data: object[]): VTransmitFile;
    copyNativeFile(file: File): VTransmitFile;
    copyOwnAndInheritedProps(...data: object[]): VTransmitFile;
    handleProgress(data: {
        bytesSent: number;
        totalBytes: number;
    }): void;
    handleProgressEvent(e: ProgressEvent): void;
    startProgress(): VTransmitFile;
    endProgress(): VTransmitFile;
    chunkify(maxBytes: number, rename: (parentFile: VTransmitFile, meta: {
        chunkIndex: number;
        chunkLength: number;
    }) => string): VTransmitFile[];
    nativeFile: File;
    dataUrl: string;
    static fromNativeFile(file: File, ...data: any[]): VTransmitFile;
    static idFactory(): string;
}
export default VTransmitFile;
