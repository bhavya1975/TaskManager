const {body} = require('express-validator');

const deleteTaskValidator = [
    body("_id","valid document id is needed").notEmpty().isMongoId(),
];
module.exports = deleteTaskValidator;