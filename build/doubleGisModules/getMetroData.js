"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geoAPI_1 = require("../geoAPI/geoAPI");
const httpsPromised_1 = require("../utils/httpsPromised");
function getMetroData(metroId) {
    const queryUrl = geoAPI_1.default.getDoubleGisGetDataUrl(metroId);
    return httpsPromised_1.default.get(queryUrl)
        .then(handleApiError);
}
function handleApiError(data) {
    if (data.meta.code !== 200) {
        return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
    }
    return Promise.resolve(data);
}
exports.default = getMetroData;
