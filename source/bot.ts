import * as TeleBot from 'telebot';
import config from './config';
import { startup, shutdown } from './utils/spy';

const bot = new TeleBot(config.teleToken);

bot.on('start', startup);

/*
* isn't work because we're
* didn't actually *stop* the bot
*/
bot.on('stop', shutdown);

export default bot;
