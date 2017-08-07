"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const config_1 = require("../config");
const dictionary_1 = require("../locales/dictionary");
const httpsPromised_1 = require("../utils/httpsPromised");
class GeoAPI {
    constructor(geoToken) {
        this.token = geoToken;
    }
    getStationscheduleByName(stationName) {
        return this.getStationId(stationName)
            .then(stationId => this.getStationSchedule(stationId))
            .then(this.handleWrongStationSubtype)
            .then(this.transformResponseToSchedule);
    }
    getStationSchedule(stationId) {
        const queryUrl = geoAPI.getDoubleGisGetScheduleUrl(stationId);
        return httpsPromised_1.default.get(queryUrl)
            .then(this.handleNewAPIError);
    }
    getStationId(queryString) {
        const augmentedQueryString = dictionary_1.default.augmentedQueryString(queryString);
        const queryUrl = geoAPI.getDoubleGisSearchUrl(augmentedQueryString);
        return httpsPromised_1.default.get(queryUrl)
            .then(this.handleOldAPIError)
            .then(data => Promise.resolve(data.result[0].id));
    }
    handleNewAPIError(data) {
        if (data.meta.code !== 200) {
            return Promise.reject(new Error(`#getStationSchedule() ${data.meta.code} API error: ${data.meta.error.message}`));
        }
        return Promise.resolve(data);
    }
    handleOldAPIError(data) {
        if (data.response_code !== '200') {
            return Promise.reject(new Error(`#getStationId() ${data.response_code} API error: ${data.error_message}`));
        }
        return Promise.resolve(data);
    }
    handleWrongStationSubtype(data) {
        if (data.result.items[0].subtype !== 'metro') {
            return Promise.reject(new Error(`Search error: searching 'metro', but get '${data.result.items[0].subtype}'`));
        }
        return Promise.resolve(data);
    }
    getDoubleGisSearchUrl(query) {
        return `https://catalog.api.2gis.ru/geo/search?q=${encodeURIComponent(query)}&version=1.3&key=${this.token}`;
    }
    getDoubleGisGetScheduleUrl(stationId) {
        return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.token}`;
    }
    transformResponseToSchedule(data) {
        const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const unReadySchedule = data.result.items[0].schedule;
        const todayInWeekAsArrayIndex = moment().day() - 1;
        const scheduleToday = unReadySchedule[week[todayInWeekAsArrayIndex]];
        const schedule = {
            end: scheduleToday.working_hours[0].to,
            start: scheduleToday.working_hours[0].from,
            stationName: data.result.items[0].name,
        };
        return Promise.resolve(schedule);
    }
}
const geoAPI = new GeoAPI(config_1.default.doubleGisToken);
exports.default = geoAPI;
