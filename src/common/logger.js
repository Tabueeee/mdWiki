const winston = require('winston');
const argv = require('yargs').argv;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: {},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'warnings.log', level: 'warn'})
    ]
});

if (process.env.DEV === 'true') {
    let level = 'info';

    if (argv.v || argv.verbose) {
        level = 'verbose';
    }

    if (argv.silly || argv.debug) {
        level = 'silly';
    }

    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: level
    }));
}

module.exports = logger;
