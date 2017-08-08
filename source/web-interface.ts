import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import log from './utils/log';

class Server {
  private server: http.Server;
  private port = 80;
  private hostname = 'localhost';

  constructor() {
    this.server = http.createServer((req, res) => this.handleRequest(req, res));
  }

  public run() {
    this.server.listen(this.port, this.hostname, () => {
      log.stdOut(`Server running at http://${this.hostname}:${this.port}/`);
    });
  }

  private handleRequest(request: http.ServerRequest, response: http.ServerResponse) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    this.readLog(path.resolve(__dirname, '../log/errors.log'), (errors) => {
      const content = {
        errors,
        status: 'online',
      };

      response.write(JSON.stringify(content));
      response.end();
    });
  }

  private readLog(fileName: string, cb: (data: any[]) => void) {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        return console.error(err);
      }
      const errors = [...data.toString().split('\n').filter(str => str !== '').map(str => JSON.parse(str))];

      cb(errors);
    });
  }
}

const server = new Server();
export default server;
