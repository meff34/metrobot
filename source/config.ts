import * as path from 'path';
import log from './utils/log';
import { readFileSync } from 'jsonfile';

export interface Config {
  doubleGisToken: string;
  teleToken: string;
  hostname: string;
  port: number;
  spyUserIds: number[];
}

class ConfigLoader {
  public config: Config;

  constructor(pathToFile: string) {
    try {
      this.config = readFileSync(pathToFile);
    } catch (err) {
      log.runtimeError(new Error(err));
    }
  }
}

const { config } = new ConfigLoader(path.join(__dirname, '../config.json'));

export default config;
