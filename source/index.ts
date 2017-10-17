import bot from './telebotModules/bot';
import server from './web-interface';

import './subscribers/messages';
import './subscribers/commands';

bot.start();
server.run();
