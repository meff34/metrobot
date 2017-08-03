import * as Telebot from 'telebot';
import getMetroData from '../doubleGisModules/getMetroData';
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
  getMetroData(message.text)
    .then((metroData: any) => {
      const response = responseFormatter(metroData);
      message.reply.text(response, opts);
    })
    .catch((error: any) => {
      log.error(message, error);
      message.reply.text(ru.errorMessage, opts);
    });
}
