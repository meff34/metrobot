import answerToMessage from './telebotModules/answer';
import bot from './telebotModules/bot';
import commands from './telebotModules/commands';

answerToMessage(bot);
commands(bot);

bot.start();
