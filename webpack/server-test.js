const common = require('./common');
const webpack = require('webpack');
const path = require('path');

let config = {
    entry: path.normalize(__dirname + '/../server/tests/unit/server-tests.ts'),
    output: {
        filename: 'server-tests-bundle.js',
        path: path.normalize(__dirname + '/../build/server/')
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

module.exports.configName = 'server-test';

module.exports.init = argv => {
    if (argv.sourcemap) {
        config.devtool = argv.sourcemap;
    }
    return config;
};