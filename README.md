# metrobot
telegram bot on node.js

### Bot location
[here](https://t.me/just_another_one_telegram_bot)

### Development
```bash
$ git clone ...
$ yarn install
```
make file `./config/config.js` with `Config` class like this:

```javascript
class Config {
  constructor() {
    this.doubleGisToken = 'YOUR-2GIS-TOKEN';
    this.secretTeleToken = 'YOUR-TELEGRAM-TOKEN';
  }

  get teleToken() { return this.secretTeleToken; }
  set teleToken(val) { throw new TypeError(`${val} can't be teleToken`); }

  getDoubleGisSearchUrl(query) {
    return `https://catalog.api.2gis.ru/geo/search?q=${encodeURIComponent(query)}&version=1.3&key=${this.doubleGisToken}`;
  }

  getDoubleGisGetDataUrl(stationId) {
    return `https://catalog.api.2gis.ru/2.0/transport/station/get?id=${stationId}&key=${this.doubleGisToken}`;
  }
}

module.exports = new Config();
```
then run
```bash
$ npm develop
```

### Tests
```bash
$ npm test
```

### Stack
[Telebot](https://github.com/mullwar/telebot), [Mocha](http://mochajs.org/), [eslint](http://eslint.org/), [Moment](https://momentjs.com/).

