"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class GeoAPI {
    constructor(geoToken) {
        this.token = geoToken;
    }
    getDoubleGisSearchUrl(query) {
        return `https://catalog.api.2gis.ru/geo/search?q=${encodeURIComponent(query)}&version=1.3&key=${this.token}`;
    }
    getDoubleGisGetDataUrl(stationId) {
        return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.token}`;
    }
}
const geoAPI = new GeoAPI(config_1.default.doubleGisToken);
exports.default = geoAPI;
