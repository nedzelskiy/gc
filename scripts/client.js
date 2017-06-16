'use strict';

const fs = require('fs');
const cmd = require('node-cmd');
const webpack = require('webpack');
const chalkInstance = require('chalk');
const webpackConfigGetter = require('../webpack/client');
const chalk = new chalkInstance.constructor({enabled:true});
// const webpackConfigTestGetter = require('../webpack/client-test');

let compiler = {};
let compilerTest = {};

let MakeServerEnv = function(argv) {
    this._argv = argv;
    this._allowedDevices = fs.readdirSync('./client').filter(name => fs.statSync('./client/' + name).isDirectory());
    let mess = "You should add build device flag, example: npm run <script name> -- --device=" + this._allowedDevices.join('|');

    this.getWatcherOptions = () => {
        return {
            paths: ['both', 'client'],
            filters: {
                includeFile: function(fullPath) {
                    return !/(\.map|init\.ts)$/.test(fullPath);
                }
            }
        };
    };

    this.prepareToStart = () => {
        return new Promise((resolve, reject) => {
            if (!this._argv.device) {
                this._argv.device = 'desktop';
                //return reject(new Error(mess));
            }
            if (this._allowedDevices.filter(name => name === this._argv.device).length < 1) {
                return reject(new Error(mess));
            }
            // compile files if haven't already done
            if (!fs.existsSync('.tmp/client/init.js')) {
                cmd.get('tsc client/init.ts --outDir ./.tmp/', (mess, err) => {
                    err && reject(err);
                    !err && resolve();
                });
            } else {
                resolve();
            }
        });
    };

    this.runProcess = () => {
        compiler = webpack(webpackConfigGetter.init(argv));
        // compilerTest = webpack(webpackConfigTestGetter.init(argv));

        //compile test
        new Promise((resolve, reject) => {
            resolve();
            // compilerTest.run((err, stats) => {
            //     !err && console.log('Compiling tests successful!');
            //     !err && resolve();
            //     err && console.log(chalk.red('Compile tests failed!'));
            //     err && reject(err);
            // });
        })
        // run tests
        .then(() => {

            return new Promise((resolve, reject) => {
                resolve()
                // cmd.get(`node node_modules/jasmine/bin/jasmine.js build/server/server-tests-bundle.js`, (mess, err) => {
                //     !err && console.log(chalk.magenta(mess));
                //     !err && resolve();
                //     err && console.log(chalk.red(mess));
                //     err && reject(err);
                // });
            });

        })
        // compile source
        .then(() => {

            return new Promise((resolve, reject) => {
                compiler.run((err, stats) => {
                    this._argv.profile && cmd.get(`mkdir .tmp`, (mess, err) => {
                        (err && -1 === err.toString().indexOf('already exists')) && console.error(err);
                        require('jsonfile').writeFileSync('./.tmp/stats.json', stats.toJson());
                    });

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
        .catch(err => {
            let mess = `ERROR: something wrong, error code = [${err.code}]: `;
            console.error(err);
        });
    };

};

module.exports = MakeServerEnv;