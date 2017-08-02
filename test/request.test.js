/* global describe it before after */

const assert = require('assert');
const config = require('./../config/config');
const httpsPromised = require('./../source/utils/request').httpsPromised;
const http = require('http');
const RequestPromised = require('./../source/utils/request').RequestPromised;

const httpPromised = new RequestPromised(http);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});

describe('HTTPS', () => {
  describe('#httpsGet()', () => {
    before(() => server.listen(8000));
    after(() => server.close());

    it('should load json file without errors', (done) => {
      assert.doesNotThrow(() => {
        const stationName = 'парнас';
        const url = config.getDoubleGisSearchUrl(stationName);
        Promise.all([
          httpsPromised.get(url),
          httpPromised.get('http://localhost:8000'),
        ])
          .then(() => done())
          .catch(err => done(new Error(err)));
      });
    });
  });
});
