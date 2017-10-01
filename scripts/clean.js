#!/usr/bin/env node
const { promisify } = require("util")
const { resolve } = require("path")
const fs = require("fs")
const [unlink, readdir] = [fs.unlink, fs.readdir].map(promisify)

async function rmDirContents(dirPath) {
  try {
    const entries = await readdir(dirPath, { encoding: "utf8" })
    return await Promise.all(entries.map(entry => unlink(resolve(dirPath, entry))))
  } catch (err) {
    console.error(err)
  }
}

async function main() {
  try {
    return await rmDirContents(resolve(__dirname, "../dist"))
  } catch (err) {
    console.error(err)
  }
}

main()
