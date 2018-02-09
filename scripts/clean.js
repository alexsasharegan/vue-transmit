#!/usr/bin/env node
const { promisify } = require("util")
const { resolve } = require("path")
const fs = require("fs")
const [unlink, readdir] = [fs.unlink, fs.readdir].map(promisify)
const $rimraf = require("rimraf")

function rimraf(...args) {
  return new Promise((resolve, reject) => {
    $rimraf(...args, resolve)
  })
}

async function rmDirContents(dirPath) {
  try {
    return await rimraf(dirPath)
  } catch (err) {
    console.error(err)
  }
}

async function main() {
  try {
    return await Promise.all([
      rmDirContents(resolve(__dirname, "../lib")),
      rmDirContents(resolve(__dirname, "../dist")),
      rmDirContents(resolve(__dirname, "../types"))
    ])
  } catch (err) {
    console.error(err)
  }
}

main()
