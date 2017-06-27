'use strict';
import * as chalkInstance from 'chalk';
const chalk: chalkInstance.Chalk = new chalkInstance.constructor({enabled:true});

export default class Logger {

    public static error(mess: string, conditions: {}): void {
        let date = new Date();
        let error = Error();
        console.log(chalk.gray('<><><><><><><><><><><><><><>'));
        console.log(chalk.bold.red('[ERROR]: ', date.toString(), mess));
        error && error.stack && console.log(error.stack.split('at')[4]);
        console.log(conditions);
        console.log(chalk.gray('<><><><><><><><><><><><><><>'));
    }


    public static devLog(mess: string): boolean {

        return true;
    }
}