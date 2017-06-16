const WebpackSourceMapSupport  = require('webpack-source-map-support');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
//both
    plugins: [],
    extensions: [".tsx", ".ts", ".js"],
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }
    ],
    externals: [],
// server
    server: {
        rules: [],
        plugins: [
            new WebpackSourceMapSupport()
        ],
        extensions: [],
        externals: [
            nodeExternals()
        ],
        target: 'node'
    },
// client
    client: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ],
        plugins: [
            new ExtractTextPlugin({
                filename: "styles.css"
            })
        ],
        extensions: [],
        externals: [],
        target: 'web'
    }
};