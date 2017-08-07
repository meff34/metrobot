import { expect } from 'chai';
import 'mocha';
import geoAPI from '../source/geoAPI/geoAPI';

describe('GeoAPI', () => {
  describe('#getStationId()', () => {
    it('should return correct station id', (done) => {
      const stationName = 'парнас';
      const stationId = 5348810536518754;
      geoAPI
        .getStationId(stationName)
        .then((result) => {
          expect(result).to.equal(stationId);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('#getStationSchedule()', () => {
    it('should return 200 API code', (done) => {
      const stationName = 'парнас';
      const stationId = 5348810536518754;
      geoAPI.getStationSchedule(stationId)
        .then((data) => {
          expect(data.meta.code).to.equal(200);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('#getStationscheduleByName()', () => {
    it('should return schedule', (done) => {
      const stationName = 'василеостровская';
      geoAPI
        .getStationscheduleByName(stationName)
        .then((data) => {
          expect(data).to.have.property('stationName');
          expect(data).to.have.property('start');
          expect(data).to.have.property('end');
          done();
        })
        .catch(error => done(error));
    });
  });
});
