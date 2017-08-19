const path = require("path")
const fs = require("fs")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MinifyPlugin = require("babel-minify-webpack-plugin")
const pjson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json")))

const showBundleAnalysis = false
const ENV = {
  VERSION: JSON.stringify(pjson.version),
  PRODUCTION: JSON.stringify(false)
}

const extractStyles = new ExtractTextPlugin({
  filename: "css/[name].css"
})

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${pjson.name}.js`
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@core": path.join(__dirname, "src/core")
    }
  },
  module: {
    // strictThisContextOnImports: true,
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other pre-processors should work out of the box, no loader config like this necessary.
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/lodash-es")],
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "images/bundled/[name].[ext]?[hash]"
        }
      },
      {
        test: /\.scss$/,
        use: extractStyles.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                autoprefixer: false,
                importLoaders: 2
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.css$/,
        use: extractStyles.extract(["css-loader"])
      },
      {
        test: /\.styl$/,
        loader: ["style", "css", "stylus"]
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
          name: "fonts/[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [extractStyles],
  devServer: {
    historyApiFallback: true,
    noInfo: true
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
  module.exports.devtool = "#source-map"
  const productionPlugins = []

  // Used for app
  ENV.PRODUCTION = JSON.stringify(true)
  // Synthetic process environment.
  ENV["process.env"] = {
    // Used for plugins
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
  productionPlugins.push(
    new MinifyPlugin({
      removeConsole: true,
      removeDebugger: true
    })
  )

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

  if (showBundleAnalysis) {
    productionPlugins.push(new BundleAnalyzerPlugin())
  }

  module.exports.plugins.push(...productionPlugins)
}

module.exports.plugins.push(new webpack.DefinePlugin(ENV))
