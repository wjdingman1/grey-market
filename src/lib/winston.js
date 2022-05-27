const winston = require('winston');

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`),
    ),
});

module.exports = logger;
