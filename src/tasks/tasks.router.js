const express = require('express');
const tasksController = require("./tasks.controller.js");
const {body, validationResult} = require('express-validator');
const createTaskValidator = require('./validators/createTask.validator.js');

const tasksRouter = express.Router();

tasksRouter.get("/tasks",tasksController.handleGetRequest);
tasksRouter.post("/tasks",createTaskValidator,
(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handlePostRequest(req,res);
    }
    else{
        return res.status(400).json({errors: result.array()});
    }
});

tasksRouter.patch("/tasks",tasksController.handlePatchRequest);

tasksRouter.delete("/tasks",tasksController.handleDeleteRequest);

module.exports = tasksRouter;