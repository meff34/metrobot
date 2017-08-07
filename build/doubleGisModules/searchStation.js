"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geoAPI_1 = require("../geoAPI/geoAPI");
const ru_1 = require("../locales/ru");
const httpsPromised_1 = require("../utils/httpsPromised");
function searchStation(queryString) {
    const augmentedQueryString = ru_1.default.augmentedQueryString(queryString);
    const queryUrl = geoAPI_1.default.getDoubleGisSearchUrl(augmentedQueryString);
    return httpsPromised_1.default.get(queryUrl)
        .then(handleAPIError)
        .then(data => Promise.resolve(data.result[0].id));
}
exports.default = searchStation;
function handleAPIError(data) {
    if (data.response_code !== '200') {
        return Promise.reject(new Error(`${data.response_code} API error: ${data.error_message}`));
    }
    return Promise.resolve(data);
}
