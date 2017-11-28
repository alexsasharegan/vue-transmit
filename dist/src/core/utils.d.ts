import VTransmitFile from "../classes/VTransmitFile";
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare const defineProperty: {
    (o: any, p: string, attributes: PropertyDescriptor & ThisType<any>): any;
    (o: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): any;
};
export declare function uniqueId(prefix: string): string;
export declare function copyOwnAndInheritedProps(obj: object): object;
export declare type Rounding = "round" | "ceil" | "floor" | "trunc";
export declare function round(number: number, decimals?: number, roundStyle?: Rounding): number;
export declare function fromBytesToKbit(bytes: number): number;
export declare function fromBytesToMbit(bytes: number): number;
export declare function toKbps(bytes: number, seconds: number): number;
export declare function toMbps(bytes: number, seconds: number): number;
export declare const hbsRegex: RegExp;
export declare function hbsReplacer(context?: object): (match: string, capture: string) => any;
export declare function objFactory(): {};
export declare function scaleH(ratio: number, width: number): number;
export declare function scaleW(ratio: number, height: number): number;
export declare function scaleDims(ratio: number, width?: number, height?: number): number[];
export interface IDrawImageArgs {
    sx: number;
    sy: number;
    sWidth: number;
    sHeight: number;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
}
export interface IDimensions {
    width: number;
    height: number;
}
export declare function resizeImg(file: VTransmitFile, dims: IDimensions): IDrawImageArgs;
export declare function webkitIsFile(entry: WebKitFileEntry | WebKitDirectoryEntry): entry is WebKitFileEntry;
export declare function webkitIsDir(entry: WebKitFileEntry | WebKitDirectoryEntry): entry is WebKitDirectoryEntry;
