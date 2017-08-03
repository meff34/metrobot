import * as https from 'https';

class HttpsPromised {
  public get(queryUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      https.get(queryUrl, (res: https.IncomingMessage) => {
        const error = this.handleHttpError(res);

        if (error) {
          reject(error.message);
          // consume response data to free up memory
          res.resume();
          return;
        }

        this.handleServerResponse(res, resolve, reject);
      }).on('error', (e: Error) => {
        reject(new Error(`Http connection error: ${e.message}`));
      });
    });
  }

  private handleHttpError(response: https.IncomingMessage) {
    const { statusCode } = response;
    const contentType = response.headers['content-type'] as string;
    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed. \nStatus Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
    }
    return error;
  }

  private handleServerResponse(response: https.IncomingMessage, resolve: (value: any) => void, reject: (value: any) => void) {
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
  }
}

const httpsPromised = new HttpsPromised();

export default httpsPromised;
