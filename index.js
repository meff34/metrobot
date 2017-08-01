const TeleBot = require('telebot');
const teleToken = require('./config/config').teleToken;
const answerToMessage = require('./source/telebotModules/answer');

const bot = new TeleBot(teleToken);

answerToMessage(bot);

bot.start();
