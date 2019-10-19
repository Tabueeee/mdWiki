const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: {},
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.DEV === 'true') {
    let level = 'info';
    if (process.argv.includes('--v')) {
        level = 'verbose';
    }

    if (process.argv.includes('--silly') || process.argv.includes('--debug')) {
        level = 'silly';
    }

    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: level
    }));
}


module.exports = logger;
