import config from '../config';
import fetch from 'node-fetch';

interface Location {
  latitude: string;
  longitude: string;
}

const getUrl = ({ latitude, longitude }: Location): string => {
  return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&types=subway_station&key=${config.googleToken}`;
};

const handleResponse = (response: any) =>
  response.status === 'OK'
    ? Promise.resolve(response.results[0].name)
    : Promise.reject(new Error(`Google API Error: ${response.satus}`));

export const getByLocation = (location: Location): Promise<string> =>
  fetch(getUrl(location))
    .then(res => res.json())
    .then(handleResponse);
