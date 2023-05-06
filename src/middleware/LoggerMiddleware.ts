import winston from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  trensports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});
