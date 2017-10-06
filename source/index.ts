import answerToMessage from './telebotModules/answer';
import bot from './telebotModules/bot';
import commands from './telebotModules/commands';
import server from './web-interface';

answerToMessage();
commands();

bot.start();

server.run();
