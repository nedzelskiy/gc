const common = require('./common');
const webpack = require('webpack');
const path = require('path');

let config = {
    entry: path.normalize(__dirname + '/../server/src/app.ts'),
    output: {
        filename: 'server-bundle.js'
    },
    target: common.server.target,
    externals: common.server.externals.concat(common.externals),
    module: {
        rules: common.server.rules.concat(common.rules)
    },
    resolve: {
        extensions: common.server.extensions.concat(common.extensions)
    },
    plugins: common.server.plugins.concat(common.plugins)
};

module.exports.configName = 'server';
module.exports.init = argv => {
    if (argv.sourcemap) {
        config.devtool = argv.sourcemap;
    }
    if (argv.profile) {
        config.profile = true;
    }
    config.output.path = path.normalize(__dirname + '/../build/server/');
    if (argv.production) {
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        const minifyHTML = require('html-minifier').minify;

        config.output.path = path.normalize(__dirname + '/../build/prod/');
        config.plugins = config.plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                },
                sourceMap: true
            }),
            new CopyWebpackPlugin([
                {
                    from: path.normalize(__dirname + '/../server/src/assets/'),
                    to: path.normalize(__dirname + '/../build/prod/assets/'),
                    transform: function(content, path_) {
                        let filename = path.basename(path_);
                        let ext = path.extname(filename).slice(1);
                        if ('ejs' === ext) {
                            return minifyHTML(content.toString('utf-8'), {
                                trimCustomFragments: true,
                                collapseInlineTagWhitespace: true,
                                collapseBooleanAttributes: true,
                                collapseWhitespace: true,
                                removeComments: true
                            });
                        } else {
                            return content;
                        }
                    }
                },
                {
                    from: path.normalize(__dirname + '/../package.json'),
                    to: path.normalize(__dirname + '/../build/prod/package.json')
                }
            ])
        ]);
    }
    return config;
};