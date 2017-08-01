const moment = require('moment');

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatResponse(metroData) {
  // TODO: определение дня после полуночи
  try {
    const schedule = metroData.result.items[0].schedule;
    const stationName = metroData.result.items[0].name;

    const todayInWeekAsArrayIndex = moment().day() - 1;
    const scheduleToday = schedule[week[todayInWeekAsArrayIndex]];

    const start = scheduleToday.working_hours[0].from;
    const end = scheduleToday.working_hours[0].to;
    return `Станция метро '${stationName}' работает\nс ${start} до ${end} 🚇`;
  } catch (error) {
    console.error(error);
    return new Error(error.message);
  }
}

module.exports = formatResponse;
