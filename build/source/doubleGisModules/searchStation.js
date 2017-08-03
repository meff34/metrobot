"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise");
const config_1 = require("../../config/config");
function searchStation(queryString) {
    const augmentedQueryString = `СПБ ${queryString} метро`;
    const queryUrl = config_1.default.getDoubleGisSearchUrl(augmentedQueryString);
    return requestPromise(queryUrl)
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
