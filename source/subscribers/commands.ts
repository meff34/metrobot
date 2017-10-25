import bot from '../bot';
import dictionary from '../locales/dictionary';

function subscribeCommands() {
  bot.on('/start', msg => msg.reply.text(dictionary.greeting));
  bot.on('/help', msg => msg.reply.text(dictionary.help));
}

subscribeCommands();
