import * as bunyan from 'bunyan'
import * as chalk from 'chalk'
import * as moment from 'moment'
import { spyLog } from './spy'

const runtimeLogger = bunyan.createLogger({
  name: 'metrobot runtime',
  streams: [{ level: 'error', path: 'log/runtimeErrors.log' }],
})

const telegramLogger = bunyan.createLogger({
  name: 'metrobot',
  streams: [{ level: 'error', path: 'log/errors.log' }],
})


export const botError =
  (msg: { username: string, first_name: string, last_name: string, text: string }, errorInstance: Error) => {
    const logMessage = getLogMessage(msg, errorInstance)
    telegramLogger.error(logMessage)

    spyLog(`api error: ${JSON.stringify(logMessage, null, 2)}`)
  }

export const runtimeError =
  (error: Error) => {
    stdOutError('#runtimeError', error)
    runtimeLogger.error(error)
  }

// tslint:disable:no-console
export const stdOut =
  (definition: string, ...message: any[]) => {
    console.info(chalk.green(definition), ...message)
  }

const stdOutError =
  (definition: string, ...message: any[]) => {
    console.info(chalk.red(definition), ...message)
  }
// tslint:enable:no-console

const getLogMessage =
  ({ username, first_name, last_name, text }: any, errorInstance: Error) => ({
    errorMessage: errorInstance.toString(),
    from: `@${username} (${first_name} ${last_name})`,
    time: moment().format('HH:mm:ss'),
    userInput: text,
  })
