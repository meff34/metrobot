"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const answer_1 = require("./telebotModules/answer");
const bot_1 = require("./telebotModules/bot");
const commands_1 = require("./telebotModules/commands");
answer_1.default(bot_1.default);
commands_1.default(bot_1.default);
bot_1.default.start();
