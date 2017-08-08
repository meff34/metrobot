import answerToMessage from './telebotModules/answer';
import bot from './telebotModules/bot';
import commands from './telebotModules/commands';
import server from './web-interface';

answerToMessage(bot);
commands(bot);

bot.start();

server.run();
