const request = require('../utils/request');
const config = require('../../config/config');

function searchStation(queryString) {
  const augmentedQueryString = `СПБ ${queryString} метро`;
  const queryUrl = config.doubleGisSearchUrl(augmentedQueryString);

  // TODO: handleApiError
  return request.get(queryUrl)
    .then((data, err) => new Promise((resolve, reject) => {
      if (err) reject(err);
      resolve(data.result[0].id);
    }));
}

module.exports = searchStation;
