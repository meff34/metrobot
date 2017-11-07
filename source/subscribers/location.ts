import bot from '../bot'
import dictionary from '../locales/dictionary'
import { getByLocation } from '../geoAPI/googleLocationAPI'
import { getStationscheduleByName } from '../geoAPI/2gisScheduleAPI'
import { formatForLocationRequest } from '../utils/responseFormatter'
import { botError } from '../utils/log'
import { spy } from '../utils/spy'

function subscribeLocation() {
  bot.on('location', subscriber)
}

const subscriber =
  async ({ location, reply, from, text }: any) => {
    try {
      const { stationName, location: { latitude, longitude } } = await getByLocation(location)

      reply.location([latitude, longitude])

      const schedule = await getStationscheduleByName(stationName)
      const response = formatForLocationRequest(schedule)

      reply.text(response)

      spy({ text: 'location request', ...from })
    } catch (error) {
      botError({ text, ...from }, error)
      reply.text('Куда это тебя занесло?')
    }
  }

subscribeLocation()
