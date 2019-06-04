const loggerOptions = {
  logDirectory: '/var/log/rapuha',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};
const logger = require('simple-node-logger').createRollingFileLogger(loggerOptions);

module.exports = logger;
