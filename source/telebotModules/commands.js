const { greeting, help } = require('../locales/ru');

function commands(bot) {
  bot.on('/start', (msg) => {
    msg.reply.text(greeting);
  });

  bot.on('/help', (msg) => {
    msg.reply.text(help);
  });
}

module.exports = commands;
