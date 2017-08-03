import config from '../config/config';
import httpsPromised from '../utils/httpsPromised';
import log from '../utils/log';
import searchStation from './searchStation';

function getMetroData(stationName: string) {
  return searchStation(stationName)
    .then((metroId: string) => {
      const queryUrl = config.getDoubleGisGetDataUrl(metroId);
      log.info('#getQueryURL', queryUrl);
      return httpsPromised.get(queryUrl);
    })
    .then(handleApiError);
}

function handleApiError(data: any) {
  if (data.meta.code !== 200) {
    return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
  }
  return Promise.resolve(data);
}

export default getMetroData;
