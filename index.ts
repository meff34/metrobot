import answerToMessage from './source/telebotModules/answer';
import bot from './source/telebotModules/bot';
import commands from './source/telebotModules/commands';

answerToMessage(bot);
commands(bot);

bot.start();
