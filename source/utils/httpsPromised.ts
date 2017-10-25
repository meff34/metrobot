import * as https from 'https';

export const get = (queryUrl: string): Promise<any> =>
  new Promise((resolve, reject) => {
    https.get(queryUrl, (res: https.IncomingMessage) => {
      const error = handleHttpError(res);

      if (error) {
        reject(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      handleServerResponse(res, resolve, reject);
    }).on('error', (e: Error) => {
      reject(new Error(`Http connection error: ${e.message}`));
    });
  });

const handleHttpError = (response: https.IncomingMessage) => {
  const { statusCode } = response;
  const contentType = response.headers['content-type'] as string;
  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed. \nStatus Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
  }
  return error;
};

const handleServerResponse =
  (response: https.IncomingMessage, resolve: (value: any) => void, reject: (value: any) => void) => {
    response.setEncoding('utf8');
    let rawData = '';
    response
      .on('data', (chunk) => { rawData += chunk; })
      .on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
  };
