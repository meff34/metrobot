"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const moment = require("moment");
const chalk = require("chalk");
class Logger {
    constructor() {
        this.logEngine = bunyan.createLogger({
            name: 'metrobot',
            streams: [
                { level: 'error', path: 'log/errors.log' },
            ],
        });
    }
    error(telegramMessage, errorInstance) {
        const logMessage = {
            errorMessage: errorInstance.toString(),
            from: telegramMessage.from.username,
            time: moment().format('DD.MM.YYYY, HH:mm:ss'),
            userInput: telegramMessage.text,
        };
        this.logEngine.error(logMessage);
    }
    info(definition, ...message) {
        // tslint:disable:no-console
        console.info('\n');
        console.info(chalk.underline.bold(definition), ...message);
        // tslint:enable:no-console
    }
}
const log = new Logger();
exports.default = log;
