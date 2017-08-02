const config = require('../../config/config');
const httpsPromised = require('../utils/request').httpsPromised;
const searchStation = require('./searchStation');

const getMetroData = stationName =>
  searchStation(stationName)
    .then((metroId) => {
      const queryUrl = config.getDoubleGisGetDataUrl(metroId);
      return httpsPromised.get(queryUrl);
    })
    .then(handleApiError);

function handleApiError(data) {
  if (data.meta.code !== 200) {
    return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
  }
  return Promise.resolve(data);
}

module.exports = getMetroData;
