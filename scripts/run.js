'use strict';

const argv = require('minimist')(process.argv.slice(2));
const chalkInstance = require('chalk');
const chalk = new chalkInstance.constructor({enabled:true});
const MakeEnv = require(`./${argv.target}`);
const chalkMessage = (message) => console.log(chalk.cyan('====================\r\n Chalk message: '), message);
const makeEnv = new MakeEnv(argv);

makeEnv.prepareToStart().then(() => {
    chalkMessage(chalk.white.bold('FOR HELP COMMANDS RUN WITH --h'));

    if (argv.h) {
        console.log("\r\n ALSO AVAILABLE COMMANDS: \r\n");
        console.log("--profile: build stats.json file \r\n");
        console.log("--game=<specific game>: build specific game in game build mode \r\n");
        process.exit();
    }
    if (!argv.watching) {
        makeEnv.runProcess();
        return;
    }
    const Watcher = require('watch-fs').Watcher;
    !makeEnv.getWatcherOptions() && chalkMessage(chalk.red('Watch options not found!'));
    !makeEnv.getWatcherOptions() && process.exit(1);

    const watcher = new Watcher(makeEnv.getWatcherOptions());
    const delayFunction = (fn, time) => {
        delayFunction.process && clearTimeout(delayFunction.process);
        delayFunction.process = setTimeout(fn, time);
    };
    delayFunction.process = false;

    watcher.on('create', function(name) {
        chalkMessage(chalk.green('file ' + name + ' created'));
        delayFunction(makeEnv.runProcess, 1000);
    });

    watcher.on('change', function(name) {
        chalkMessage(chalk.yellow('file ' + name + ' changed'));
        delayFunction(makeEnv.runProcess, 1000);
    });

    watcher.on('delete', function(name) {
        chalkMessage(chalk.red('file ' + name + ' deleted'));
        delayFunction(makeEnv.runProcess, 1000);
    });

    watcher.start(function(err, failed) {
        chalkMessage(chalk.cyan('Chalk process started...'));
        delayFunction(makeEnv.runProcess, 0);
    });
})
.catch(err => {
    let mess = `ERROR: something wrong, error code = [${err.code}]: `;
    console.error(err);
});






return false;
var cluster = require('cluster');

// TODO fork on number of cores
var numCPUs = 1;
if (cluster.isMaster) {
    for (var i = 0; i< numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker %d died (%s). restarting...',
            worker.process.pid, signal || code);
        cluster.fork();
    });

    return false;
}