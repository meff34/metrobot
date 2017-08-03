const bot = require('./source/telebotModules/bot');
const answerToMessage = require('./source/telebotModules/answer');
const commands = require('./source/telebotModules/commands');

answerToMessage(bot);
commands(bot);

bot.start();
