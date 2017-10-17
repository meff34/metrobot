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
  "doubleGisToken": "2gis api token as string",
  "teleToken": "telegram bot token as string",
  "spyUserIds": "array of developer ids as number[]",
  "hostname": "development host as string",
  "port": "development port as number"
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
[Telebot](https://github.com/mullwar/telebot), [Mocha](http://mochajs.org/), [tslint](https://palantir.github.io/tslint/), [Moment](https://momentjs.com/), [bunyan](https://github.com/trentm/node-bunyan).

