/* global describe it */

const assert = require('assert');
const getMetroData = require('./../source/doubleGisModules/getMetroData');
const searchStation = require('./../source/doubleGisModules/searchStation');

describe('GeoAPI', () => {
  describe('#getMetroData()', () => {
    it('should return one result', (done) => {
      const stationName = 'парнас';
      getMetroData(stationName)
        .then((data) => {
          done(assert.equal(1, data.result.total, `got ${data.result.total} stations, expect one result`));
        })
        .catch(err => done(err));
    });
  });
  describe('#searchStation()', () => {
    it('should return correct stationId', (done) => {
      const stationName = 'парнас';
      const stationId = 5348810536518754;
      searchStation(stationName)
        .then((data) => {
          done(assert.equal(data, stationId, `incorrect station id for ${stationName}, expect ${stationId}, got ${data}`));
        })
        .catch(err => done(err));
    });
  });
});
