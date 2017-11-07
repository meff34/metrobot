import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'
import config from './config'
import { stdOut, runtimeError } from './utils/log'

const { hostname = 'localhost', port = 8080 } = config

const handleRequest = (request: http.ServerRequest, response: http.ServerResponse) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json; charset=utf-8')

  readLog(
    path.resolve(__dirname, '../log/errors.log'),
    errors => response.end(JSON.stringify(errors), 'utf-8')
  )
}

const readLog = (fileName: string, cb: (data: any[]) => void) => {
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      runtimeError(err)
      return
    }

    const errors = toJSON(data)
    cb(errors)
  })
}

const toJSON =
  (data: string) =>
    [...data.split('\n').filter(str => str !== '').map(str => JSON.parse(str))]


const server = http.createServer(handleRequest)

export const initiateServer = () => server.listen(port, hostname, () => {
  stdOut(`Server listening at http://${hostname}:${port}/`)
})
