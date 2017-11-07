import bot from './bot'
import { initiateServer } from './web-interface'

import './subscribers/messages'
import './subscribers/commands'
import './subscribers/lifecycle'
import './subscribers/location'

bot.start()
initiateServer()
