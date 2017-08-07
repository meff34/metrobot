"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeleBot = require("telebot");
const config_1 = require("../config");
exports.default = new TeleBot(config_1.default.teleToken);
