import * as requestPromise from 'request-promise';
import config from '../../config/config';
import searchStation from './searchStation';

const getMetroData = (stationName: string) =>
  searchStation(stationName)
    .then((metroId: number) => {
      const queryUrl = config.getDoubleGisGetDataUrl(metroId);
      return requestPromise(queryUrl);
    })
    .then(handleApiError);

function handleApiError(data: any) {
  if (data.meta.code !== 200) {
    return Promise.reject(new Error(`${data.meta.code} API error: ${data.meta.error.message}`));
  }
  return Promise.resolve(data);
}

export default getMetroData;
