import * as TeleBot from 'telebot';
import config from '../config/config';

export default new TeleBot(config.teleToken);
