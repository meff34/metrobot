# metrobot
telegram bot on node.js

### Bot location
[here](https://t.me/RunForrestBot)

### Development
```bash
$ git clone ...
$ yarn install
```
make file `config.json` in the root folder:

```json
{
  "doubleGisToken": "YOUR-2GIS-TOKEN",
  "teleToken": "YOUR-TELEGRAM-TOKEN"
}
```
then run
```bash
$ npm run develop
```

### Tests
```bash
$ npm test
```

### Stack
[Telebot](https://github.com/mullwar/telebot), [Mocha](http://mochajs.org/), [tslint](https://palantir.github.io/tslint/), [Moment](https://momentjs.com/).

