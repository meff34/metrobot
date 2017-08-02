const TeleBot = require('telebot');
const teleToken = require('./../../config/config').teleToken;

module.exports = new TeleBot(teleToken);
