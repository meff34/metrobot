import bot from './bot';
import server from './web-interface';

import './subscribers/messages';
import './subscribers/commands';

bot.start();
server.run();
