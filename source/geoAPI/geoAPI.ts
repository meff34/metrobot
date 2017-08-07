import * as moment from 'moment';
import config from '../config';
import dictionary from '../locales/dictionary';
import httpsPromised from '../utils/httpsPromised';
import log from '../utils/log';

export interface ISchedule {
  stationName: string;
  start: string;
  end: string;
}

class GeoAPI {
  private token: string;

  constructor(geoToken: string) {
    this.token = geoToken;
  }

  public getStationscheduleByName(stationName: string): Promise<ISchedule> {
    return this.getStationId(stationName)
      .then(stationId => this.getStationSchedule(stationId))
      .then(this.handleWrongStationSubtype)
      .then(this.transformResponseToSchedule);
  }

  public getStationSchedule(stationId: number): Promise<any> {
    const queryUrl = geoAPI.getDoubleGisGetScheduleUrl(stationId);
    return httpsPromised.get(queryUrl)
      .then(this.handleNewAPIError);
  }

  public getStationId(queryString: string): Promise<number> {
    const augmentedQueryString = dictionary.augmentedQueryString(queryString);
    const queryUrl = geoAPI.getDoubleGisSearchUrl(augmentedQueryString);

    return httpsPromised.get(queryUrl)
      .then(this.handleOldAPIError)
      .then(data => Promise.resolve(parseInt(data.result[0].id, 10)));
  }

  private handleNewAPIError(data: any) {
    if (data.meta.code !== 200) {
      return Promise.reject(new Error(`#getStationSchedule() ${data.meta.code} API error: ${data.meta.error.message}`));
    }
    return Promise.resolve(data);
  }

  private handleOldAPIError(data: any) {
    if (data.response_code !== '200') {
      return Promise.reject(new Error(`#getStationId() ${data.response_code} API error: ${data.error_message}`));
    }
    return Promise.resolve(data);
  }

  private handleWrongStationSubtype(data: any) {
    if (data.result.items[0].subtype !== 'metro') {
      return Promise.reject(new Error(`Search error: searching 'metro', but get '${data.result.items[0].subtype}'`));
    }
    return Promise.resolve(data);
  }

  private getDoubleGisSearchUrl(query: string): string {
    return `https://catalog.api.2gis.ru/geo/search?q=${encodeURIComponent(query)}&version=1.3&key=${this.token}`;
  }

  private getDoubleGisGetScheduleUrl(stationId: number): string {
    return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.token}`;
  }

  private transformResponseToSchedule(data: any): Promise<ISchedule> {
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const unReadySchedule = data.result.items[0].schedule;
    const todayInWeekAsArrayIndex = moment().day() - 1;
    const scheduleToday = unReadySchedule[week[todayInWeekAsArrayIndex]];

    const schedule: ISchedule = {
      end: scheduleToday.working_hours[0].to,
      start: scheduleToday.working_hours[0].from,
      stationName: data.result.items[0].name,
    };

    return Promise.resolve(schedule);
  }
}

const geoAPI = new GeoAPI(config.doubleGisToken);

export default geoAPI;
