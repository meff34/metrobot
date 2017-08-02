const jsonfile = require('jsonfile');
const moment = require('moment');

jsonfile.spaces = 2;

function errorLogger(error) {
  const file = './log/errors.json';
  const obj = {
    errorMessage: error.toString(),
    time: moment().format('DD.MM.YYYY, HH:mm:ss'),
  };

  jsonfile.writeFile(file, obj, { flag: 'a' }, (err) => {
    if (err) console.error(err);
  });
}

module.exports = errorLogger;
