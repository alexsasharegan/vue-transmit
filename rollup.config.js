const fs = require("fs")
const path = require("path")
const vue = require("rollup-plugin-vue")
const buble = require("rollup-plugin-buble")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const uglify = require("rollup-plugin-uglify")
const { minify } = require("uglify-es")
const CleanCSS = require("clean-css")
const { camelCase } = require("lodash")
const { name, dependencies } = require("./package.json")

const base = __dirname
const src = path.resolve(base, "src")
const dist = path.resolve(base, "dist")

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
}

module.exports = {
    entry: "index.js",
    external: Object.keys(dependencies),
    moduleName: name,
    plugins: [
        vue({
            cssModules: {
                generateScopedName: "[name]__[local]"
            },
            css(style) {
                fs.writeFileSync(`./dist/${name}.css`, new CleanCSS().minify(style).styles)
            }
        }),
        buble(),
        resolve({ external: ["vue"] }),
        commonjs(),
        uglify({}, minify)
    ],
    globals: {},
    targets: [
        {
            format: "cjs",
            moduleName: camelCase(name),
            dest: `./dist/${name}.common.js`,
            sourceMap: true
        },
        {
            format: "es",
            dest: `./dist/${name}.esm.js`,
            sourceMap: true
        },
        {
            format: "umd",
            moduleName: camelCase(name),
            dest: `./dist/${name}.js`,
            sourceMap: true
        }
    ]
}
