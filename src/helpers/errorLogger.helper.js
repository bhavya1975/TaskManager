const { query, param } = require('express-validator');
const logger = require('./winston.helper.js');

function errorLogger(message,req,error){
    logger.error(`Error creating task: ${error.message}`,{
        metadata: {
            errorCode: error.code,
            errorName: error.name,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            error: error,
            query: req.query,
            param: req.param
        },
    });
}
module.exports = errorLogger;