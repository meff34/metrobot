import * as bunyan from 'bunyan';
import * as moment from 'moment';
import * as chalk from 'chalk';

class Logger {
  private logEngine: bunyan;

  constructor() {
    this.logEngine = bunyan.createLogger({
      name: 'metrobot',
      streams: [
        { level: 'error', path: 'log/errors.log' },
      ],
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

  public info(definition: string, ...message: any[]) {
    // tslint:disable:no-console
    console.info('\n');
    console.info(chalk.underline.bold(definition), ...message);
    // tslint:enable:no-console
  }
}

const log = new Logger();

export default log;
