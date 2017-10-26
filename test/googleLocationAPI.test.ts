import { expect } from 'chai'
import 'mocha'
import { getByLocation } from '../source/geoAPI/googleLocationAPI'


describe('googleLocationAPI', () => {
  describe('#getByLocation()', () => {
    it('should return Devyatkino location', (done) => {
      const location = {
        latitude: `${60.057436}`,
        longitude: `${30.454577}`,
      }

      getByLocation(location)
        .then((data) => {
          expect(data).property('name').equal('Devyatkino')
          expect(data).property('location').property('latitude').equal(60.050189)
          expect(data).property('location').property('longitude').equal(30.442632)
          done()
        })
        .catch(err => done(err))
    })
  })
})
