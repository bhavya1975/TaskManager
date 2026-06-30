const { body } = require('express-validator');
//express validator helps validation at the route level. we can use it as a middleware to validate the request body, query params, and route params. it is a middleware that will be used in the route level. it will validate the request body and if there is any error it will send the error response to the client. if there is no error it will call the next middleware which is the controller function.

// array 

const createTaskValidator = [
    body("title","Title is required").notEmpty(),
    body("title","Title must be a string").isString(),
    body("title").isLength({max: 100}),
    body("title").trim(),
    body("dueDate","Due date must be a valid date")
    .optional()
    .isISO8601(),
    body("description","Description is required and must be a string").optional().isString().trim(),
    body("description","Description max length = 500").optional().isLength({max: 500}),
    body("priority","Priority must be one of normal, low, high").optional().notEmpty().isIn(["normal", "low", "high"]),
    body("status","Status must be one of todo, inProgress, completed").optional().notEmpty().isIn(["todo", "inProgress", "completed"]),
];
module.exports = createTaskValidator;