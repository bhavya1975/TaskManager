const {body} = require('express-validator');

const updateTaskValidator = [
    body("_id","valid document id is needed").notEmpty().bail().isMongoId(),
    body("title","title must be a string").isString().optional(),
    body("description","description must be a string and cannot be more than 100 character").optional().isString().trim().isLength({max:100}),
    body("dueDate","Due date must be a valid date")
    .optional()
    .isISO8601(),
    body("description","Description is required and must be a string").optional().isString().trim(),
    body("description","Description max length = 500").optional().isLength({max: 500}),
    body("priority","Priority must be one of normal, low, high").optional().isIn(["normal", "low", "high"]),
    body("status","Status must be one of todo, inProgress, completed").optional().isIn(["todo", "inProgress", "completed"]),
];
module.exports = updateTaskValidator;