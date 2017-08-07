"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseFormatter(schedule) {
    return `Станция метро '${schedule.stationName}' работает\nс ${schedule.start} до ${schedule.end} 🚇`;
}
exports.default = responseFormatter;
