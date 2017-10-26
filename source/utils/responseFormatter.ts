import { ISchedule } from '../geoAPI/2gisScheduleAPI'

export const responseFormatter = (schedule: ISchedule): string =>
  `Станция метро '${schedule.stationName}' работает\nс ${schedule.start} до ${schedule.end} 🚇`

export const formatForLocationRequest = (schedule: ISchedule): string =>
  `Ближайшая станция метро - '${schedule.stationName}'.\nОна работает\nс ${schedule.start} до ${schedule.end} 🚇`
