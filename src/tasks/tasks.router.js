const express = require('express');
const tasksController = require("./tasks.controller.js");
const {body, validationResult} = require('express-validator');
const createTaskValidator = require('./validators/createTask.validator.js');
const getTaskValidator = require('./validators/getTask.validator.js');
const updateTaskValidator = require('./validators/updateTask.validator.js');
const { StatusCodes } = require('http-status-codes');
const deleteTaskValidator = require('./validators/deleteTask.validator.js');

const tasksRouter = express.Router();

tasksRouter.get("/tasks",getTaskValidator, (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handleGetRequest(req,res);
    }
    else{
        return res.status(400).json({errors: result.array()});
    }   
});
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

tasksRouter.patch("/tasks",updateTaskValidator,(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handlePatchRequest(req,res);
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json({errors: result.array()});
    }
});


tasksRouter.delete("/tasks",deleteTaskValidator,(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handleDeleteRequest(req,res);
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json({errors: result.array()});
    }
});

module.exports = tasksRouter;