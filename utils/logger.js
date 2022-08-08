import winston from 'winston';

const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
  });
  
const warnFilter = winston.format((info, opts) => {
    return info.level === 'warn' ? info : false;
});
  
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console({level: "info"})
        ,
        new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
        format: errorFilter(),
        }),
        new winston.transports.File({
        filename: './logs/warn.log',
        level: 'warn',
        format: warnFilter(),
        }),
    ]
});
  

export default logger;
