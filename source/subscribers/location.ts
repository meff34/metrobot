import bot from '../bot'
import dictionary from '../locales/dictionary'
import { getByLocation } from '../geoAPI/googleLocationAPI'
import { getStationscheduleByName } from '../geoAPI/2gisScheduleAPI'
import { formatForLocationRequest } from '../utils/responseFormatter'
import log from '../utils/log'
import { spy } from '../utils/spy'

function subscribeLocation() {
  bot.on('location', subscriber)
}

const subscriber = (message: any) => {
  getByLocation(message.location)
    .then(({ name, location: { latitude, longitude } }) => {
      message.reply.location([latitude, longitude])
      return getStationscheduleByName(name)
    })
    .then((schedule) => {
      const response = formatForLocationRequest(schedule)
      message.reply.text(response)
      spy({ text: 'location request', ...message })
    })
    .catch((error) => {
      log.botError(message, error)
      message.reply.text('Куда это тебя занесло?')
    })
}

subscribeLocation()
