import * as fs from 'fs';
import * as path from 'path';
import log from './utils/log';

class ConfigLoader {
  public config: {
    doubleGisToken: string;
    teleToken: string;
  };

  constructor(path: string) {
    try {
      const data = fs.readFileSync(path, 'utf-8');
      this.config = JSON.parse(data);
    } catch (err) {
      this.handleReadFileError(err);
    }
  }

  private handleReadFileError(error: NodeJS.ErrnoException) {
    log.runtimeError(error);
  }
}

const config = (new ConfigLoader(path.resolve(__dirname, '../config.json'))).config;

export default config;
