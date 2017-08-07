import config from '../config';

class GeoAPI {
  private token: string;

  constructor(geoToken: string) {
    this.token = geoToken;
  }

  public getDoubleGisSearchUrl(query: string) {
    return `https://catalog.api.2gis.ru/geo/search?q=${encodeURIComponent(query)}&version=1.3&key=${this.token}`;
  }

  public getDoubleGisGetDataUrl(stationId: string) {
    return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.token}`;
  }
}

const geoAPI = new GeoAPI(config.doubleGisToken);

export default geoAPI;
