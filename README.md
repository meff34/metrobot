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
  "doubleGisToken": "2gis api token", // string
  "teleToken": "telegram bot token", // string
  "spyUserIds": "array of developer ids", // number[]
  "hostname": "development host", // string
  "port": "development port", // number
  "googleToken": "google maps API token" // string
}
```
then run
```bash
$ npm run develop
```

### Tests
```bash
$ npm t
```

### Stack
[Telebot](https://github.com/mullwar/telebot), [Mocha](http://mochajs.org/), [tslint](https://palantir.github.io/tslint/), [Moment](https://momentjs.com/), [bunyan](https://github.com/trentm/node-bunyan).

