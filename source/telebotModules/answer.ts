import * as Telebot from 'telebot';
import getMetroData from '../doubleGisModules/getMetroData';
import searchStation from '../doubleGisModules/searchStation';
import ru from '../locales/ru';
import log from '../utils/log';
import responseFormatter from '../utils/responseFormatter';

export default function answerToMessage(bot: Telebot) {
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

function answer(message: any, opts = { asReply: false }) {
  searchStation(message.text)
    .then(metroId => getMetroData(metroId))
    .then((metroData) => {
      const response = responseFormatter(metroData);
      message.reply.text(response, opts);
    })
    .catch((error: any) => {
      log.botError(message, error);
      message.reply.text(ru.errorMessage, opts);
    });
}
