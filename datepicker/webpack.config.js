const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/datepicker.ts',
    output: {
        path: __dirname + "/dist/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        "sourceMap": true,
                        "removeComments": false
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attrs: ["img:src", "link:href", "object:data"]
                }
            },
            {
                test: /.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?importLoaders=1"
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    hash: "sha512",
                    digest: "hex",
                    name: "images/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: "Date picker"
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: 'inline-source-map',
};