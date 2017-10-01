export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
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
export declare enum READY_STATES {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
}
