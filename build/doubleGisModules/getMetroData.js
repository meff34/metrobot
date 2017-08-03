"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const httpsPromised_1 = require("../utils/httpsPromised");
const log_1 = require("../utils/log");
const searchStation_1 = require("./searchStation");
function getMetroData(stationName) {
    return searchStation_1.default(stationName)
        .then((metroId) => {
        const queryUrl = config_1.default.getDoubleGisGetDataUrl(metroId);
        log_1.default.info('#getQueryURL', queryUrl);
        return httpsPromised_1.default.get(queryUrl);
    })
        .then(handleApiError);
}
function handleApiError(data) {
    if (data.meta.code !== 200) {
        return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
    }
    return Promise.resolve(data);
}
exports.default = getMetroData;
