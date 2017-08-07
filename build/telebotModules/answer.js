"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geoAPI_1 = require("../geoAPI/geoAPI");
const dictionary_1 = require("../locales/dictionary");
const log_1 = require("../utils/log");
const responseFormatter_1 = require("../utils/responseFormatter");
function answerToMessage(bot) {
    bot.on('text', msg => answer(msg));
    bot.on('edit', msg => answer(msg, { asReply: true }));
}
exports.default = answerToMessage;
function answer(message, opts = { asReply: false }) {
    if (message.text.indexOf('/') !== -1) {
        return;
    }
    geoAPI_1.default
        .getStationscheduleByName(message.text)
        .then((schedule) => {
        const response = responseFormatter_1.default(schedule);
        message.reply.text(response, opts);
    })
        .catch((error) => {
        log_1.default.botError(message, error);
        message.reply.text(dictionary_1.default.errorMessage, opts);
    });
}
