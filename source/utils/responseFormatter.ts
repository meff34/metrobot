import { ISchedule } from '../geoAPI/geoAPI';

export default function responseFormatter(schedule: ISchedule): string {
  return `Станция метро '${schedule.stationName}' работает\nс ${schedule.start} до ${schedule.end} 🚇`;
}
