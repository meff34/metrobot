import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'
import config from './config'
import { stdOut, runtimeError } from './utils/log'

const { hostname = 'localhost', port = 8080 } = config

const handleRequest = (request: http.ServerRequest, response: http.ServerResponse) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json; charset=utf-8')

  const errorsDestination = path.resolve(__dirname, '../log/errors.log')

  readLog(errorsDestination)
    .then(errors => response.end(JSON.stringify(errors)))
}

const readLog = (fileName: string): Promise<any[]> =>
  new Promise((resolve) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        runtimeError(err)
        return
      }

      const errors = toJSON(data)
      resolve(errors)
    })
  })

const toJSON =
  (data: string) =>
    [...data.split('\n').filter(str => str !== '').map(str => JSON.parse(str))]


const server = http.createServer(handleRequest)

export const initiateServer =
  () =>
    server.listen(port, hostname, () => {
      stdOut(`Server listening at http://${hostname}:${port}/`)
    })
