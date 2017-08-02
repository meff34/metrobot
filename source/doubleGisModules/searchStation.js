const httpsPromised = require('../utils/request').httpsPromised;
const config = require('../../config/config');

function searchStation(queryString) {
  const augmentedQueryString = `СПБ ${queryString} метро`;
  const queryUrl = config.getDoubleGisSearchUrl(augmentedQueryString);

  return httpsPromised.get(queryUrl)
    .then(handleAPIError)
    .then(data => Promise.resolve(data.result[0].id));
}

function handleAPIError(data) {
  if (data.response_code !== '200') {
    return Promise.reject(new Error(`${data.response_code} API error: ${data.error_message}`));
  }
  return Promise.resolve(data);
}

module.exports = searchStation;
