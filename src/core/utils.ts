import VTransmitFile from "../classes/VTransmitFile"

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

export function objFactory() {
  return {}
}

export enum READY_STATES {
  UNSENT = 0,
  OPENED = 1,
  HEADERS_RECEIVED = 2,
  LOADING = 3,
  DONE = 4
}

export function scaleH(ratio: number, width: number): number {
  return width / ratio
}

export function scaleW(ratio: number, height: number): number {
  return height * ratio
}

export function scaleDims(ratio: number, width?: number, height?: number): number[] {
  console.log(arguments);

  return typeof width === "number" ? [width, scaleH(ratio, width)] : [scaleW(ratio, height), height]
}

export interface IDrawImageArgs {
  sx: number
  sy: number
  sWidth: number
  sHeight: number
  dx: number
  dy: number
  dWidth: number
  dHeight: number
}

export interface IDimensions {
  width: number
  height: number
}

export function resizeImg(file: VTransmitFile, dims: IDimensions): IDrawImageArgs {
  // Extract the object's primitive values so we don't mutate the input
  const sRatio = file.width / file.height
  const dRatio = dims.width / dims.height
  const imgCoords = {
    sx: 0,
    sy: 0,
    sWidth: file.width,
    sHeight: file.height,
    dx: 0,
    dy: 0,
    dWidth: dims.width,
    dHeight: dims.height
  }

  let w, h
  if (dRatio > sRatio) {
    [w, h] = scaleDims(dRatio, file.width)
  } else {
    [w, h] = scaleDims(dRatio, undefined, file.height)
  }

  if (w < file.width) {
    imgCoords.sx = (file.width - w) / 2
    imgCoords.sWidth = w
  }
  if (h < file.height) {
    imgCoords.sy = (file.height - h) / 2
    imgCoords.sHeight = h
  }

  return imgCoords
}
