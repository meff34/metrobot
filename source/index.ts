import bot from './bot'
import server from './web-interface'

import './subscribers/messages'
import './subscribers/commands'
import './subscribers/lifecycle'
import './subscribers/location'

bot.start()
server.run()
