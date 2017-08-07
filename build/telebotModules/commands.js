"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = require("../locales/dictionary");
function commands(bot) {
    bot.on('/start', (msg) => {
        msg.reply.text(dictionary_1.default.greeting);
    });
    bot.on('/help', (msg) => {
        msg.reply.text(dictionary_1.default.help);
    });
}
exports.default = commands;
