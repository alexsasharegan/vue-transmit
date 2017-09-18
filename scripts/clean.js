#!/usr/bin/env node
const { promisify } = require("util")
const { resolve } = require("path")
const fs = require("fs")
const [unlink, readdir] = [fs.unlink, fs.readdir].map(promisify)

async function main() {
  try {
    const jsDir = resolve(__dirname, "../dist")
    const entries = await readdir(jsDir)
    await Promise.all(entries.map(entry => unlink(resolve(jsDir, entry))))
  } catch (err) {
    console.error(err)
  }
}

main()
