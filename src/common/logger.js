/**
 * logger.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const winston = require('winston');

/**
 * Perform connection to the database.
 */
const configureLogger = async () => {
  await winston.configure({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()]
  });
};

module.exports = {
  configureLogger
};
