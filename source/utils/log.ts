import * as bunyan from 'bunyan';
import * as chalk from 'chalk';
import * as moment from 'moment';

class Logger {
  private telegramLogger: bunyan;
  private runtimeLogger: bunyan;

  constructor() {
    this.telegramLogger = bunyan.createLogger({
      name: 'metrobot',
      streams: [
        { level: 'error', path: 'log/errors.log' },
      ],
    });
    this.runtimeLogger = bunyan.createLogger({
      name: 'metrobot',
      streams: [
        { level: 'error', path: 'log/runtimeErrors.log' },
      ],
    });
  }

  public botError(telegramMessage: any, errorInstance: Error) {
    const logMessage = {
      errorMessage: errorInstance.toString(),
      from: telegramMessage.from.username,
      time: moment().format('DD.MM.YYYY, HH:mm:ss'),
      userInput: telegramMessage.text,
    };
    this.telegramLogger.error(logMessage);
  }

  public runtimeError(error: Error) {
    this.runtimeLogger.error(error);
  }

  public info(definition: string, ...message: any[]) {
    // tslint:disable:no-console
    console.info('\n');
    console.info(chalk.underline.bold(definition), ...message);
    // tslint:enable:no-console
  }
}

const log = new Logger();

export default log;
