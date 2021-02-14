const path = require('path');
const { transports, createLogger, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(__dirname, 'logs/app_log.log'),
            level: 'info',
            maxsize: 1024 * 50
        })
    ]
});

exports.logger = logger;