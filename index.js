const TeleBot = require('telebot');
const teleToken = require('./config/config').teleToken;

const bot = new TeleBot(teleToken);

bot.on('text', (msg) => {
  msg.reply.text(msg.text);
});

bot.start();
