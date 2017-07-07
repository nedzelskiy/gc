'use strict';

const webpack = require('webpack');

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
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};