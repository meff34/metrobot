import bot from '../bot'
import { startup } from '../utils/spy'

bot.on('start', startup)
