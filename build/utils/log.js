"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const chalk = require("chalk");
const moment = require("moment");
class Logger {
    constructor() {
        this.telegramLogger = bunyan.createLogger({
            name: 'metrobot',
            streams: [{ level: 'error', path: 'log/errors.log' }],
        });
        this.runtimeLogger = bunyan.createLogger({
            name: 'metrobot runtime',
            streams: [{ level: 'error', path: 'log/runtimeErrors.log' }],
        });
    }
    botError(telegramMessage, errorInstance) {
        const logMessage = {
            errorMessage: errorInstance.toString(),
            from: telegramMessage.from.username,
            time: moment().format('DD.MM.YYYY, HH:mm:ss'),
            userInput: telegramMessage.text,
        };
        this.telegramLogger.error(logMessage);
    }
    runtimeError(error) {
        this.stdOutError('#runtimeError', error);
        this.runtimeLogger.error(error);
    }
    stdOut(definition, ...message) {
        // tslint:disable:no-console
        console.info(chalk.green(definition), ...message);
        // tslint:enable:no-console
    }
    stdOutError(definition, ...message) {
        // tslint:disable:no-console
        console.info(chalk.red(definition), ...message);
        // tslint:enable:no-console
    }
}
const log = new Logger();
exports.default = log;
