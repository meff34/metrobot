import * as moment from 'moment';
import fetch from 'node-fetch';
import { path } from 'ramda';
import config from '../config';
import { augmentedQueryString } from '../locales/dictionary';
import log from '../utils/log';

export interface ISchedule {
  stationName: string;
  start: string;
  end: string;
}

export class GeoAPI {
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

    return fetch(queryUrl)
      .then(res => res.json())
      .then(this.handleAPIError);
  }

  public getStationId(queryString: string): Promise<number> {
    const augmentedQuery = augmentedQueryString(queryString);
    const queryUrl = geoAPI.getDoubleGisSearchUrl(augmentedQuery);

    return fetch(queryUrl)
      .then(res => res.json())
      .then(this.handleAPIError)
      .then(this.findStationId);
  }

  private findStationId(data: any): Promise<number> {
    const item = data.result.items.find((elem: any) => elem.hint.hint_type === 'station.metro');
    return Promise.resolve(parseInt(item.id, 10));
  }

  private handleAPIError(data: any) {
    return data.meta.code === 200
      ? Promise.resolve(data)
      : Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
  }

  private handleWrongStationSubtype(data: any) {
    const pathToSubtype = [
      'result',
      'items',
      '0',
      'subtype',
    ];

    const subtype = path(pathToSubtype)(data);

    return subtype === 'metro'
      ? Promise.resolve(data)
      : Promise.reject(new Error(`Search error: searching 'metro', but get '${subtype}'`));
  }

  private getDoubleGisSearchUrl(query: string): string {
    return `https://catalog.api.2gis.ru/2.0/suggest/list?key=${this.token}&region_id=38&lang=ru&q=${encodeURIComponent(query)}`;
  }

  private getDoubleGisGetScheduleUrl(stationId: number): string {
    return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.token}`;
  }

  private todayAs2gisNeeds = () => {
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayInWeekAsArrayIndex = moment().day();
    return week[todayInWeekAsArrayIndex];
  }

  private transformResponseToSchedule = (data: any): Promise<ISchedule> => {
    const today = this.todayAs2gisNeeds();
    const pathToTime = [
      'result',
      'items',
      '0',
      'schedule',
      today,
      'working_hours',
      '0',
    ];

    const workingHours = path(pathToTime)(data) as {from: string, to: string};

    const schedule: ISchedule = {
      end: workingHours.to,
      start: workingHours.from,
      stationName: data.result.items[0].name,
    };

    return workingHours
      ? Promise.resolve(schedule)
      : Promise.reject(new Error(`Parsing error`));
  }
}

const geoAPI = new GeoAPI(config.doubleGisToken);

export default geoAPI;
