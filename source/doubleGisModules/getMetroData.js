const config = require('../../config/config');
const httpsGet = require('../utils/request');
const searchStation = require('./searchStation');

const getMetroData = station =>
  // TODO: handleApiError
  searchStation(station)
    .then((metroId) => {
      const queryUrl = config.doubleGisGetDataUrl(metroId);
      return httpsGet.get(queryUrl);
    });

module.exports = getMetroData;
