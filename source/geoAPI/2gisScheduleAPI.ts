import * as moment from 'moment'
import fetch from 'node-fetch'
import { path } from 'ramda'
import config from '../config'
import { augmentedQueryString } from '../locales/dictionary'

export interface ISchedule {
  stationName: string
  start: string
  end: string
}

export const getStationscheduleByName =
  (stationName: string): Promise<ISchedule> =>
    getStationId(stationName)
      .then(getStationSchedule)
      .then(handleWrongStationSubtype)
      .then(transformResponseToSchedule)

export const getStationId =
  (queryString: string): Promise<number> => {
    const augmentedQuery = augmentedQueryString(queryString)
    const queryUrl = getDoubleGisSearchUrl(augmentedQuery)

    return fetch(queryUrl)
      .then(res => res.json())
      .then(handleAPIError)
      .then(findStationId)
  }

export const getStationSchedule =
  (stationId: number): Promise<any> =>
    fetch(getDoubleGisGetScheduleUrl(stationId))
      .then(res => res.json())
      .then(handleAPIError)

const findStationId =
  (data: any): Promise<number> => {
    const item = data.result.items.find((elem: any) => elem.hint.hint_type === 'station.metro')
    return Promise.resolve(parseInt(item.id, 10))
  }

const handleAPIError =
  (data: any) =>
    data.meta.code === 200
      ? Promise.resolve(data)
      : Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`))

const handleWrongStationSubtype = (data: any) => {
  const pathToSubtype = [
    'result',
    'items',
    '0',
    'subtype',
  ]

  const subtype = path(pathToSubtype)(data)

  return subtype === 'metro'
    ? Promise.resolve(data)
    : Promise.reject(new Error(`Search error: searching 'metro', but got '${subtype}'`))
}

const getDoubleGisSearchUrl =
  (query: string): string =>
    `https://catalog.api.2gis.ru/2.0/suggest/list?key=${config.doubleGisToken}&region_id=38&lang=ru&q=${encodeURIComponent(query)}`

const getDoubleGisGetScheduleUrl =
  (stationId: number): string =>
    `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${config.doubleGisToken}`

const todayAs2gisNeeds =
  () =>
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][moment().day()]

const transformResponseToSchedule = (data: any): Promise<ISchedule> => {
  const today = todayAs2gisNeeds()
  const pathToTime = [
    'result',
    'items',
    '0',
    'schedule',
    today,
    'working_hours',
    '0',
  ]

  const workingHours = path(pathToTime)(data) as {from: string, to: string}

  const schedule: ISchedule = {
    end: workingHours.to,
    start: workingHours.from,
    stationName: data.result.items[0].name,
  }

  return workingHours
    ? Promise.resolve(schedule)
    : Promise.reject(new Error(`Parsing error`))
}
