const getMetroData = require('../doubleGisModules/getMetroData');
const formatResponse = require('../utils/responseFormatter');
const log = require('../utils/log');
const { errorMessage } = require('../locales/ru');

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

function answer(message, opts = { asReply: false }) {
  getMetroData(message.text)
    .then((metroData) => {
      const response = formatResponse(metroData);
      message.reply.text(response, opts);
    })
    .catch((error) => {
      log.error(message, error);
      message.reply.text(errorMessage, opts);
    });
}

module.exports = answerToMessage;
