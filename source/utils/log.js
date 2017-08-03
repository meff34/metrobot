const bunyan = require('bunyan');
const moment = require('moment');

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
      userInput: telegramMessage.text,
      from: telegramMessage.from.username,
      errorMessage: errorInstance.toString(),
      time: moment().format('DD.MM.YYYY, HH:mm:ss'),
    };
    this.logEngine.error(logMessage);
  }
}

module.exports = new Logger();
