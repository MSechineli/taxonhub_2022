import { createLogger, format, transports } from 'winston';

export class Logger {
  logger() {
    const logger = createLogger({
      transports: [
        new transports.File({
          filename: 'src/logs/error.log',
          level: 'error',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`
            })
          )
        }),
        new transports.File({
          filename: 'src/logs/info.log',
          level: 'info',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
            format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`
            })
          )
        })
      ]
    });

    return logger;
  }
}
