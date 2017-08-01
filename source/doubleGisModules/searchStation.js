const request = require('../utils/request');
const config = require('../../config/config');

function searchStation(queryString) {
  const augmentedQueryString = `СПБ ${queryString} метро`;
  const queryUrl = config.doubleGisSearchUrl(augmentedQueryString);

  return request.get(queryUrl)
    .then((data) => {
      if (data.response_code !== '200') {
        return Promise.reject(new Error(`API error: ${data.error_message}`));
      }
      return Promise.resolve(data);
    })
    .then((data, err) => new Promise((resolve, reject) => {
      if (err) reject(err);
      resolve(data.result[0].id);
    }));
}

module.exports = searchStation;
