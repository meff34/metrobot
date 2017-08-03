"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise");
const config_1 = require("../../config/config");
const searchStation_1 = require("./searchStation");
const getMetroData = (stationName) => searchStation_1.default(stationName)
    .then((metroId) => {
    const queryUrl = config_1.default.getDoubleGisGetDataUrl(metroId);
    return requestPromise(queryUrl);
})
    .then(handleApiError);
function handleApiError(data) {
    if (data.meta.code !== 200) {
        return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
    }
    return Promise.resolve(data);
}
exports.default = getMetroData;
