import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'
import config, { Config } from './config'
import log from './utils/log'

class Server {
  private server: http.Server
  private hostname: string
  private port: number

  constructor({ hostname, port }: Config) {
    this.hostname = hostname || 'localhost'
    this.port = port || 8080
    this.server = http.createServer((req, res) => this.handleRequest(req, res))
  }

  public run() {
    this.server.listen(this.port, this.hostname, () => {
      log.stdOut(`Server listening at http://${this.hostname}:${this.port}/`)
    })
  }

  private handleRequest(request: http.ServerRequest, response: http.ServerResponse) {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/plain')

    this.readLog(path.resolve(__dirname, '../log/errors.log'), (errors) => {
      const content = {
        errors,
        status: 'online',
      }

      response.write(JSON.stringify(content))
      response.end()
    })
  }

  private readLog(fileName: string, cb: (data: any[]) => void) {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        log.runtimeError(err)
        return
      }

      const errors = [...data.toString().split('\n').filter(str => str !== '').map(str => JSON.parse(str))]
      cb(errors)
    })
  }
}

const server = new Server(config)
export default server
