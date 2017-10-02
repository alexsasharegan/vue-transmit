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

export function resizeImg(file: VTransmitFile, dims: IDimensions) {
  // Extract the object's primitive values so we don't mutate the input
  let { width: oWidth, height: oHeight } = dims
  const sRatio = file.width / file.height
  const imgCoords = {
    sx: 0,
    sy: 0,
    sWidth: file.width,
    sHeight: file.height,
    dx: 0,
    dy: 0,
    dWidth: 0,
    dHeight: 0
  }

  if (oWidth == null && oHeight == null) {
    oWidth = imgCoords.sWidth
    oHeight = imgCoords.sHeight
  } else if (oWidth == null) {
    oWidth = sRatio * oHeight
  } else if (oHeight == null) {
    oHeight = 1 / sRatio * oWidth
  }

  const dRatio = oWidth / oHeight

  if (file.height < oHeight || file.width < oWidth) {
    imgCoords.dHeight = imgCoords.sHeight
    imgCoords.dWidth = imgCoords.sWidth
  } else {
    if (sRatio > dRatio) {
      imgCoords.sHeight = file.height
      imgCoords.sWidth = imgCoords.sHeight * dRatio
    } else {
      imgCoords.sWidth = file.width
      imgCoords.sHeight = imgCoords.sWidth / dRatio
    }
  }

  imgCoords.sx = (file.width - imgCoords.sWidth) / 2
  imgCoords.sy = (file.height - imgCoords.sHeight) / 2

  return imgCoords
}
