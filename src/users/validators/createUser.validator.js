const {body} = require('express-validator');

const createUserValidator = [
    body("firstName","firstname is required")    
    .isString()
    .notEmpty()
    .isLength({min: 2, max: 100})
    .trim(),
    body("lastName","lastname is a string")
    .isString()
    .optional()
    .isLength({min: 2, max: 100})
    .trim(),
    body("email","email is required")
    .isEmail()
    .notEmpty()
    .isLength({max: 200})
    .trim(),
    body("password","password is required and must contain at least one number, one uppercase letter, one lowercase letter, and one special character")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .notEmpty()
    .isLength({min: 8}),
];

module.exports = createUserValidator;