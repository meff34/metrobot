import bot from '../bot';
import geoAPI from '../geoAPI/geoAPI';
import dictionary from '../locales/dictionary';
import log from '../utils/log';
import responseFormatter from '../utils/responseFormatter';
import { spy } from '../utils/spy';

function subscribeMessages() {
  bot.on('text', msg => answer(msg));
  bot.on('edit', msg => answer(msg, { asReply: true }));
}

function answer(message: any, opts = { asReply: false }) {
  if (message.text.indexOf('/') !== -1) {
    return;
  }

  geoAPI
    .getStationscheduleByName(message.text)
    .then((schedule) => {
      const response = responseFormatter(schedule);
      message.reply.text(response, opts);
      spy(message);
    })
    .catch((error) => {
      log.botError(message, error);
      message.reply.text(dictionary.errorMessage, opts);
    });
}

subscribeMessages();
