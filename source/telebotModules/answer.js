const getMetroData = require('../doubleGisModules/getMetroData');
const formatResponse = require('../utils/responseFormatter');
const errorLogger = require('../utils/errorLogger');

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
      console.error(error);
      errorLogger(error);
      message.reply.text('Что-то я тебя не пойму.', opts);
    });
}

module.exports = answerToMessage;
