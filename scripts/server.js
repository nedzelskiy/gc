'use strict';

const cmd = require('node-cmd');
const respawn = require('respawn');
const webpack = require('webpack');
const chalkInstance = require('chalk');
const webpackConfigGetter = require('../webpack/server');
const chalk = new chalkInstance.constructor({enabled:true});
const webpackConfigTestGetter = require('../webpack/server-test');

let server = {};
let compiler = {};
let compilerTest = {};

let MakeServerEnv = function(argv) {
    this._argv = argv;

    server = respawn(['node', `./build/server/server-bundle.js`], {
        env: {
            NODE_ENV: argv.production ? 'production' : 'development'
        },
        fork: false,
        kill: 2000,
        maxRestarts: 0,
        stdio: 'inherit'
    });

    compiler = webpack(webpackConfigGetter.init(argv));
    compilerTest = webpack(webpackConfigTestGetter.init(argv));

    this.getWatcherOptions = () => {
        return {
            paths: ['both', 'server'],
            filters: {
                includeFile: function(fullPath) {
                    return !/\.map$/.test(fullPath);
                }
            }
        };
    };

    this.prepareToStart = () => {
        return new Promise((resolve, reject) => resolve(1));
    };

    this.runProcess = () => {
        // compile test
        new Promise((resolve, reject) => {
            !this._argv.unittest && resolve();
            this._argv.unittest && compilerTest.run((err, stats) => {
                !err && console.log('Compiling tests successful!');
                !err && resolve();
                err && console.log(chalk.red('Compile tests failed!'));
                err && reject(err);
            });
        })
        // run tests
            .then(() => {

                return new Promise((resolve, reject) => {
                    !this._argv.unittest && resolve();
                    this._argv.unittest && cmd.get(`node node_modules/jasmine/bin/jasmine.js build/server/server-tests-bundle.js`, (mess, err) => {
                        !err && console.log(chalk.magenta(mess));
                        !err && resolve();
                        err && console.log(chalk.red(mess));
                        err && reject(err);
                    });
                });

            })
            // delete files in prod if in production mode
            .then(() => {

                return new Promise((resolve, reject) => {
                    this._argv.development && resolve();
                    if (this._argv.production) {
                        cmd.get("find ./build/prod/* ! -iregex '(\.git\/)' | xargs rm -rf", (mess, err) => {
                            !err && resolve();
                            err && console.log(chalk.red(mess));
                            err && reject(err);
                        });
                    }
                });

            })
            // compile source
            .then(() => {

                return new Promise((resolve, reject) => {
                    compiler.run((err, stats) => {
                        !err && console.log(stats.toString({
                            colors: true,
                            chunks: false
                        }));
                        !err && resolve();
                        err && console.log(chalk.red('Compile source failed!'));
                        err && reject(err);
                    });
                });

            })
            // restart server
            .then(() => {
                (this._argv.run && !this._argv.production) && server.stop(() => server.start()); // restart
            })
            .catch(err => {
                console.log(chalk.red(`ERROR: something wrong, error code = [${err.code}]: `), err);
            });
    };
};

module.exports = MakeServerEnv;