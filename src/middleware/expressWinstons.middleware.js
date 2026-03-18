const expressWinston = require('express-winston');
const logger = require('../helpers/winston.helper.js');

const expressWinstonsMiddleware = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} responded with status {{res.statusCode}} in {{res.responseTime}}ms",
    expressFormat: true,
    colorize: true,
});

module.exports = expressWinstonsMiddleware;

