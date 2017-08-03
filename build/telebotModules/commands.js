"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ru_1 = require("../locales/ru");
function commands(bot) {
    bot.on('/start', (msg) => {
        msg.reply.text(ru_1.default.greeting);
    });
    bot.on('/help', (msg) => {
        msg.reply.text(ru_1.default.help);
    });
}
exports.default = commands;
