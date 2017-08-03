"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetroData_1 = require("../doubleGisModules/getMetroData");
const ru_1 = require("../locales/ru");
const log_1 = require("../utils/log");
const responseFormatter_1 = require("../utils/responseFormatter");
function answerToMessage(bot) {
    bot.on('text', (msg) => {
        if (msg.text.indexOf('/') !== -1) {
            return;
        }
        answer(msg);
    });
    bot.on('edit', (msg) => {
        if (msg.text.indexOf('/') !== -1) {
            return;
        }
        answer(msg, { asReply: true });
    });
}
exports.default = answerToMessage;
function answer(message, opts = { asReply: false }) {
    getMetroData_1.default(message.text)
        .then((metroData) => {
        const response = responseFormatter_1.default(metroData);
        message.reply.text(response, opts);
    })
        .catch((error) => {
        log_1.default.error(message, error);
        message.reply.text(ru_1.default.errorMessage, opts);
    });
}
