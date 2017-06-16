const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const common = require('./common');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");

let config = {
    output: {
        library: 'App',
    },
    module: {
        rules: common.client.rules.concat(common.rules)
    },
    externals: common.client.externals.concat(common.externals),
    resolve: {
        extensions: common.client.extensions.concat(common.extensions)
    },
    target: common.client.target,
    plugins: common.client.plugins.concat(common.plugins)
};

module.exports.configName = 'client';

module.exports.init = argv => {
    if (argv.sourcemap) {
        config.devtool = argv.sourcemap;
    }
    if (argv.profile) {
        config.profile = true;
    }
    config.entry = path.normalize(__dirname + `/../client/${argv.device}/src/${argv.device}.tsx`),
    config.output.path = path.normalize(__dirname + '/../build/client/');
    config.output.filename = `${argv.device}-bundle.js`;
    if (argv.production) {
        config.output.path = path.normalize(__dirname + '/../build/prod/');
    }

    if (!fs.existsSync('./.tmp/client/init.js')) {
        throw new Error('You should compile init js for client first in tmp folder!');
    }
    let initParams = require('../.tmp/client/init.js')['default'];
    config.plugins = config.plugins.concat([
        new StringReplacePlugin(),
        new CopyWebpackPlugin([
            {
                from: path.normalize(__dirname + '/../client/common/assets/'),
                to: path.normalize(__dirname + '/../build/client/')
            }
        ])
    ]);
    config.module.rules = config.module.rules.concat([
        {
            test: /\.tsx?$/,
            loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /SERVER_RENDER:([a-zA-Z]+):/ig,
                        replacement: function (match, p1, offset, string) {
                            if (!('string' === typeof initParams[p1])) {
                                return JSON.stringify(initParams[p1]);
                            }
                            return initParams[p1];
                        }
                    }
                ]
            })
        }
    ]);
    return config;
}
