/* global describe it */

const assert = require('assert');
const config = require('./../../config/config');
const https = require('./../../source/utils/request');

const url = config.doubleGisSearchUrl('парнас');

describe('Utils', () => {
  describe('#httpsGet()', () => {
    it('shouldn\'t throw error', (done) => {
      assert.doesNotThrow(() => {
        https.get(url)
          .then(() => done())
          .catch((error) => {
            done(error);
          });
      });
    });
  });
});
