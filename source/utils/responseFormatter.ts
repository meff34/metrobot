import * as moment from 'moment';

export default function responseFormatter(metroData: any): string {
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // TODO: определение дня после полуночи
  // TODO: одинаковое время каждый день?
  try {
    const schedule = metroData.result.items[0].schedule;
    const stationName = metroData.result.items[0].name;

    const todayInWeekAsArrayIndex = moment().day() - 1;
    const scheduleToday = schedule[week[todayInWeekAsArrayIndex]];

    const start = scheduleToday.working_hours[0].from;
    const end = scheduleToday.working_hours[0].to;
    return `Станция метро '${stationName}' работает\nс ${start} до ${end} 🚇`;
  } catch (error) {
    throw new Error(error.message);
  }
}
