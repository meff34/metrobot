import bot from '../bot';
import { startup, shutdown } from '../utils/spy';

function initLifecycle() {
  bot.on('start', startup);

  /*
  * isn't work because we're
  * didn't actually *stop* the bot
  */
  bot.on('stop', shutdown);
}

initLifecycle();
