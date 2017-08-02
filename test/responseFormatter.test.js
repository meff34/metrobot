/* global describe it */

const assert = require('assert');
const responseFormatter = require('./../source/utils/responseFormatter');

const mockData = {
  meta: { code: 200, api_version: '2.0.1.6.375', issue_date: '20170802' },
  result: {
    total: 1,
    items: [
      {
        name: 'Парнас',
        schedule: {
          Thu: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Sat: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Tue: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Sun: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Mon: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Wed: { working_hours: [{ to: '24:00', from: '05:45' }] },
          Fri: { working_hours: [{ to: '24:00', from: '05:45' }] },
        },
      },
    ],
  },
};

const mockResponse = 'Станция метро \'Парнас\' работает\nс 05:45 до 24:00 🚇';

describe('Utils', () => {
  describe('#responseFormatter()', () => {
    it('should return correct response', () => {
      assert.strictEqual(responseFormatter(mockData), mockResponse);
    });
  });
});
