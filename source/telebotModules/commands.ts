import * as Telebot from 'telebot';
import dictionary from '../locales/dictionary';

export default function commands(bot: Telebot) {
  bot.on('/start', (msg) => {
    msg.reply.text(dictionary.greeting);
  });

  bot.on('/help', (msg) => {
    msg.reply.text(dictionary.help);
  });

  bot.on('/location', msg => {

  })
}
