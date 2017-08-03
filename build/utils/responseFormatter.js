"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
function responseFormatter(metroData) {
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // TODO: определение дня после полуночи
    // TODO: одинаковое время каждый день?
    try {
        if (metroData.result.items[0].subtype !== 'metro') {
            throw new Error(`search error: 'metro' isn't equal '${metroData.result.items[0].subtype}'`);
        }
        const schedule = metroData.result.items[0].schedule;
        const stationName = metroData.result.items[0].name;
        const todayInWeekAsArrayIndex = moment().day() - 1;
        const scheduleToday = schedule[week[todayInWeekAsArrayIndex]];
        const start = scheduleToday.working_hours[0].from;
        const end = scheduleToday.working_hours[0].to;
        return `Станция метро '${stationName}' работает\nс ${start} до ${end} 🚇`;
    }
    catch (error) {
        throw error;
    }
}
exports.default = responseFormatter;
