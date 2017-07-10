'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: '../server/game.tsx',
    output: {
        path: __dirname + `/${process.env.gameName}/server/build/`,
        filename: 'game-bundle.js',
        library: 'Game'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 20
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "game-styles.css"
        })
    ],
    devtool: 'source-map'
};