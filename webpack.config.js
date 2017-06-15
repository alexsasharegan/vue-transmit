const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const extractStyles = new ExtractTextPlugin({
    filename: "css/[name].css"
})

module.exports = {
    entry: path.resolve(__dirname, "index.js"),

    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "VueDropzone.js",
        publicPath: path.resolve(__dirname, "dist")
    },

    resolve: {
        modules: ["node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: "vue-style-loader!css-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]?[hash]"
                }
            },
            {
                test: /\.scss$/,
                use: extractStyles.extract({
                    // use: [ 'css-loader?-autoprefixer!postcss-loader', 'sass-loader' ]
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
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // loader: "url-loader?limit=10000&mimetype=application/font-woff",
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

    const minification = new webpack.optimize.UglifyJsPlugin({
        sourcemap: true,
        unused: true,
        compress: true
    })

    const cssMinification = new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    })

    const envDefinition = new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: '"production"'
        }
    })

    const loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    })

    const productionPlugins = [minification, envDefinition, loaderOptions, cssMinification]

    module.exports.plugins.push(...productionPlugins)
}
