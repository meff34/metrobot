import * as path from 'path'
import { runtimeError } from './utils/log'
import { readFileSync } from 'jsonfile'

export interface Config {
  doubleGisToken: string
  teleToken: string
  hostname: string
  port: number
  spyUserIds: number[]
  googleToken: string
}

class ConfigLoader {
  public config: Config

  constructor(pathToFile: string) {
    try {
      this.config = readFileSync(pathToFile)
    } catch (err) {
      runtimeError(new Error(err))
    }
  }
}

const { config } = new ConfigLoader(path.join(__dirname, '../config.json'))

export default config
