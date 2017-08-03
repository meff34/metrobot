import * as bunyan from 'bunyan';
import * as moment from 'moment';

class Logger {
  private logEngine: bunyan;

  constructor() {
    this.logEngine = bunyan.createLogger({
      name: 'metrobot',
      streams: [{
        level: 'error',
        path: 'log/errors.log',
      }],
    });
  }

  public error(telegramMessage: any, errorInstance: any) {
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

export default log;
