import * as requestPromise from 'request-promise';
import config from '../../config/config';

export default function searchStation(queryString: string) {
  const augmentedQueryString = `СПБ ${queryString} метро`;
  const queryUrl = config.getDoubleGisSearchUrl(augmentedQueryString);

  return requestPromise(queryUrl)
    .then(handleAPIError)
    .then(data => Promise.resolve(data.result[0].id));
}

function handleAPIError(data: any) {
  if (data.response_code !== '200') {
    return Promise.reject(new Error(`${data.response_code} API error: ${data.error_message}`));
  }
  return Promise.resolve(data);
}
