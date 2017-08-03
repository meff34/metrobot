import * as Telebot from 'telebot';
import ru from '../locales/ru';

export default function commands(bot: Telebot) {
  bot.on('/start', (msg) => {
    msg.reply.text(ru.greeting);
  });

  bot.on('/help', (msg) => {
    msg.reply.text(ru.help);
  });
}
