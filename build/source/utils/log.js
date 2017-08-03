"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const moment = require("moment");
class Logger {
    constructor() {
        this.logEngine = bunyan.createLogger({
            name: 'metrobot',
            streams: [{
                    level: 'error',
                    path: 'log/errors.log',
                }],
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
}
const log = new Logger();
exports.default = log;
