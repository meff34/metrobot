import * as fs from 'fs';
import * as path from 'path';
import log from './utils/log';

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
      const data = fs.readFileSync(pathToFile, 'utf-8');
      this.config = JSON.parse(data);
    } catch (err) {
      log.runtimeError(new Error(err));
    }
  }
}

const config = (new ConfigLoader(path.join(__dirname, '../config.json'))).config;

export default config;
