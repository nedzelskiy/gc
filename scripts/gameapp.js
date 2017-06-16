'use strict';

const fs = require('fs');
const cmd = require('node-cmd');
const webpack = require('webpack');
const chalkInstance = require('chalk');
const webpackConfigGetter = require('../webpack/gameapp');
const chalk = new chalkInstance.constructor({enabled:true});
// const webpackConfigTestGetter = require('../webpack/client-test');

let compiler = {};
let compilerTest = {};

let MakeGameEnv = function(argv) {
    this._argv = argv;
    this._choosenGame = argv.game ? argv.game : '_all_';
    this._allowedGames = fs.readdirSync('./games').filter(name => fs.statSync('./games/' + name).isDirectory()) || [];

    this.getWatcherOptions = () => {
        return {
            paths: (function(){
                return this._choosenGame ? [`games/${this._choosenGame}`] : ['games'];
            }).call(this),
            filters: {
                includeFile: function(fullPath) {
                    return !/(\.map)$/.test(fullPath);
                }
            }
        };
    };

    this.prepareToStart = () => {

        return new Promise((resolve, reject) => {
            resolve();
        });
    };

    this.runProcess = () => {
        if ('_all_' === this._choosenGame) {
            this._allowedGames.forEach(v => {

            });
        } else {

        }
        console.log(this._allowedGames);
        return false;
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

}

module.exports = MakeGameEnv;