const { body } = require('express-validator');

const createTaskValidator = [
    body("title","Title is required").notEmpty(),
    body("title","Title must be a string").isString(),
    body("title").isLength({max: 100}),
    body("title").trim(),
    body("dueDate","Due date must be a valid date")
    .notEmpty()
    .isISO8601(),
    body("description","Description is required and must be a string").notEmpty().isString().trim(),
    body("description","Description max length = 500").isLength({max: 500}),
    body("priority","Priority must be one of normal, low, high").notEmpty().isIn(["normal", "low", "high"]),

];

module.exports = createTaskValidator;