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

function config(ctx) {
  const name = pjson.name + (ctx.ext ? `.${ctx.ext}` : "")
  const webpackConfig = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
      ...(ctx.output || {}),
      path: DIST,
      filename: `${name}.js`
    },
    resolve: {
      modules: ["node_modules"]
    },
    module: {
      rules: [
        ...(ctx.rules || []),
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              scss: ExtractTextPlugin.extract({
                use: ["css-loader!sass-loader", { loader: "postcss-loader", options: { sourceMap: true } }],
                fallback: "vue-style-loader"
              })
            }
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: `${pjson.name}.css`
      })
      // new DashboardPlugin()
    ],
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
    ext: "min",
    showBundleAnalysis: false,
    rules: [
      {
        test: /\.js$/,
        include: [SRC, LODASH],
        loader: "babel-loader",
        options: {
          plugins: BABEL_PLUGINS
        }
      }
    ]
  }),
  config({
    noMinify: true,
    rules: [
      {
        test: /\.js$/,
        include: [SRC, LODASH],
        loader: "babel-loader",
        options: {
          plugins: BABEL_PLUGINS
        }
      }
    ]
  }),
  config({
    ext: "browser",
    output: {
      library: pjson.name
        .split("-")
        .map(upperFirst)
        .join(""),
      libraryTarget: "window"
    },
    rules: [
      {
        test: /\.js$/,
        include: [SRC, LODASH],
        loader: "babel-loader",
        options: {
          plugins: BABEL_PLUGINS
        }
      }
    ]
  })
]
