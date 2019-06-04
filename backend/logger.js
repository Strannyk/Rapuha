const loggerOptions = {
  logDirectory: '/log',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};
const logger = require('simple-node-logger').createRollingFileLogger(loggerOptions);

module.exports = logger;
