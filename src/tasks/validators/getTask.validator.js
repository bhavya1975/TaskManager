const {query} = require('express-validator');

const getTaskValidator = [
    query("limit","must be an integer").isInt().optional().toInt(),
    query("page","must be an integer").isInt().optional().toInt(),
    query("order","must be either asc or desc")
        .isIn(["asc","desc"]).optional()
];

module.exports = getTaskValidator;