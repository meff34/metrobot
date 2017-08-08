import * as fs from 'fs';
import * as path from 'path';
import log from './utils/log';

class ConfigLoader {
  public config: {
    doubleGisToken: string;
    teleToken: string;
    hostname: string;
  };

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
