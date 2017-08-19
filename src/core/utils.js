export const assign = Object.assign

let idCounter = 0
/**
 * @param {string} prefix
 */
export function uniqueId(prefix) {
  var id = ++idCounter
  return String(prefix) + id
}

export function copyOwnAndInheritedProps(obj) {
  let newData = {}

  for (let prop in obj) {
    if (typeof obj[prop] !== "function") {
      newData[prop] = obj[prop]
    }
  }

  return newData
}

export function round(number, decimals = 2, roundStyle = "round") {
  const roundingFactor = Math.pow(10, decimals)
  return Math[roundStyle](number * roundingFactor) / roundingFactor
}

export function fromBytesToKbit(bytes) {
  return bytes / 125
}

export function fromBytesToMbit(bytes) {
  return bytes / 125000
}

export function toKbps(bytes, seconds) {
  return fromBytesToKbit(bytes) / seconds
}

export function toMbps(bytes, seconds) {
  return fromBytesToMbit(bytes) / seconds
}

export const hbsRegex = /{{\s*?([a-zA-Z]+)\s*?}}/g
export function hbsReplacer(context = {}) {
  return function hbsReplacerFn(match, capture) {
    return context[capture] !== undefined ? context[capture] : match
  }
}

export const READY_STATES = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
}
