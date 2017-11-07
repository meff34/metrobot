import bot from '../bot'
import { getStationscheduleByName } from '../geoAPI/2gisScheduleAPI'
import dictionary from '../locales/dictionary'
import { botError } from '../utils/log'
import { responseFormatter } from '../utils/responseFormatter'
import { spy } from '../utils/spy'

function subscribeMessages() {
  bot.on('text', msg => answer(msg))
  bot.on('edit', msg => answer(msg, { asReply: true }))
}

const answer =
  async ({ text, reply, from }: any, opts = { asReply: false }) => {
    if (text.indexOf('/') !== -1) return

    try {
      const schedule = await getStationscheduleByName(text)

      const response = responseFormatter(schedule)
      reply.text(response, opts)
      spy({ text, ...from })

    } catch (error) {
      botError({ text , ...from }, error)
      reply.text(dictionary.errorMessage, opts)
    }
  }

subscribeMessages()
