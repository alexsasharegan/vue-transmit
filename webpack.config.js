const path = require("path")
const fs = require("fs")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MinifyPlugin = require("babel-minify-webpack-plugin")
const DashboardPlugin = require("webpack-dashboard/plugin")
const pjson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json")))
const { upperFirst } = require("lodash")

const ENV = {
  VERSION: JSON.stringify(pjson.version),
  PRODUCTION: JSON.stringify(false),
  NAME: JSON.stringify(pjson.name)
}
const SRC = path.resolve(__dirname, "src")
const INDEX = path.resolve(__dirname, "index.ts")
const DIST = path.resolve(__dirname, "dist")
const LODASH = path.resolve(__dirname, "node_modules/lodash-es")
const BABEL_PLUGINS = [
  "transform-es2015-for-of",
  "transform-es2015-spread",
  "transform-es2015-arrow-functions",
  "transform-es2015-classes",
  "transform-es2015-destructuring",
  "transform-es2015-parameters",
  "transform-es2015-shorthand-properties",
  "transform-es2015-template-literals",
  "transform-es5-property-mutators"
]
  .map(s => "babel-plugin-" + s)
  .map(require)

const BABEL = {
  ES5: {
    test: /\.js$/,
    include: [SRC, INDEX, LODASH],
    loader: "babel-loader",
    options: {
      babelrc: false,
      presets: ["es2015"],
      plugins: BABEL_PLUGINS.concat(require("babel-plugin-transform-es2015-constants"))
    }
  },
  ES6: {
    test: /\.js$/,
    include: [SRC, INDEX, LODASH],
    loader: "babel-loader",
    options: {
      babelrc: false,
      plugins: BABEL_PLUGINS
    }
  }
}

function config(ctx) {
  const name = pjson.name + (ctx.ext ? `.${ctx.ext}` : "")
  const webpackConfig = {
    entry: path.resolve(__dirname, "index.ts"),
    output: {
      ...(ctx.output || {}),
      path: DIST,
      filename: `${name}.js`
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              scss: ExtractTextPlugin.extract({
                use: ["css-loader!sass-loader", { loader: "postcss-loader", options: { sourceMap: true } }],
                fallback: "vue-style-loader"
              }),
              ts: [{ loader: "babel-loader" }, { loader: "vue-ts-loader" }]
              // ts: "vue-ts-loader"
            }
          }
        },
        {
          test: /\.ts(x?)$/,
          include: path.resolve(__dirname, "src"),
          use: [{ loader: "babel-loader" }, { loader: "ts-loader" }]
        },
        ...(ctx.rules || [])
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: `${pjson.name}.css`
      })
      // new DashboardPlugin()
    ],
    externals: ctx.externals || {
      vue: {
        root: "Vue",
        commonjs2: "vue"
      }
    },
    performance: {
      hints: false
    },
    devtool: "#eval-source-map"
  }
  /**********************/
  /* PRODUCTION OPTIONS */
  /**********************/
  if (process.env.NODE_ENV === "production") {
    webpackConfig.devtool = "#source-map"
    const productionPlugins = []
    ENV.PRODUCTION = JSON.stringify(true)
    ENV["process.env"] = {
      NODE_ENV: JSON.stringify("production")
    }
    // For older plugins that don't accept options in webpack 2 API.
    productionPlugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    )
    // Groups compatible modules inside a closure
    // rather than wrapping every modules in a closure.
    // Speeds up JS parsing on the client.
    productionPlugins.push(new webpack.optimize.ModuleConcatenationPlugin())
    // Minification
    if (!ctx.noMinify) {
      productionPlugins.push(
        new MinifyPlugin({
          removeConsole: true,
          removeDebugger: true
        })
      )
    }
    // CSS minification.
    productionPlugins.push(
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    )
    if (ctx.showBundleAnalysis) {
      productionPlugins.push(new BundleAnalyzerPlugin())
    }
    webpackConfig.plugins.push(...productionPlugins)
  }
  webpackConfig.plugins.push(new webpack.DefinePlugin(ENV))

  return webpackConfig
}

module.exports = [
  config({
    ext: "esm",
    noMinify: true,
    output: {
      libraryTarget: "commonjs2"
    },
    rules: [BABEL.ES6]
  }),
  config({
    ext: "esm.min",
    showBundleAnalysis: false,
    output: {
      libraryTarget: "commonjs2"
    },
    rules: [BABEL.ES6]
  }),
  config({
    ext: "common",
    noMinify: true,
    showBundleAnalysis: false,
    output: {
      libraryTarget: "commonjs2",
      libraryExport: "default"
    },
    rules: [BABEL.ES5]
  }),
  config({
    ext: "common.min",
    showBundleAnalysis: false,
    output: {
      libraryTarget: "commonjs2",
      libraryExport: "default"
    },
    rules: [BABEL.ES5]
  }),
  config({
    ext: "browser.min",
    output: {
      library: pjson.name
        .split("-")
        .map(upperFirst)
        .join(""),
      libraryTarget: "window",
      libraryExport: "default"
    },
    rules: [BABEL.ES5],
    externals: "Vue"
  }),
  config({
    ext: "browser",
    noMinify: true,
    output: {
      library: pjson.name
        .split("-")
        .map(upperFirst)
        .join(""),
      libraryTarget: "window",
      libraryExport: "default"
    },
    rules: [BABEL.ES5],
    externals: "Vue"
  })
]
