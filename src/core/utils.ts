export const assign = Object.assign

let idCounter = 0
export function uniqueId(prefix: string): string {
  var id = ++idCounter
  return prefix + id
}

export function copyOwnAndInheritedProps(obj: object): object {
  let newData = {}
  for (let prop in obj) {
    if (typeof obj[prop] !== "function") {
      newData[prop] = obj[prop]
    }
  }
  return newData
}

export type Rounding = "round" | "ceil" | "floor" | "trunc"

export function round(number: number, decimals: number = 2, roundStyle: Rounding = "round") {
  const roundingFactor = Math.pow(10, decimals)
  return Math[roundStyle](number * roundingFactor) / roundingFactor
}

export function fromBytesToKbit(bytes: number): number {
  return bytes / 125
}

export function fromBytesToMbit(bytes: number): number {
  return bytes / 125000
}

export function toKbps(bytes: number, seconds: number): number {
  return fromBytesToKbit(bytes) / seconds
}

export function toMbps(bytes: number, seconds: number): number {
  return fromBytesToMbit(bytes) / seconds
}

export const hbsRegex = /{{\s*?([a-zA-Z]+)\s*?}}/g
export function hbsReplacer(context: object = {}) {
  return function hbsReplacerFn(match: string, capture: string) {
    return context[capture] !== undefined ? context[capture] : match
  }
}

export enum READY_STATES {
  UNSENT = 0,
  OPENED = 1,
  HEADERS_RECEIVED = 2,
  LOADING = 3,
  DONE = 4
}
