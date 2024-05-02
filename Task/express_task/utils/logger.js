const winston = require('winston');

const customLevels = {
  levels: {
    success: 0,
    reject: 1,
    info: 2,
    error: 3,
  },
  colors: {
    success: 'green',
    reject: 'yellow',
    info: 'blue',
    error: 'red',
  },
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;