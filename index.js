const bot = require('./source/telebotModules/bot');
const answerToMessage = require('./source/telebotModules/answer');

answerToMessage(bot);

bot.start();
