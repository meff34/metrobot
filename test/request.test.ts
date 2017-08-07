import { expect } from 'chai';
import 'mocha';

import config from '../source/config';
import httpsPromised from '../source/utils/httpsPromised';

describe('HTTPS', () => {
  describe('#httpsGet()', () => {
    it('should load json file without errors', (done) => {
      expect(() => {
        const stationName = 'парнас';
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        httpsPromised.get(url)
          .then(() => done())
          .catch(err => done(new Error(err)));
      }).to.not.throw();
    });
  });
});
