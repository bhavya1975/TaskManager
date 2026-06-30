const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');

async function updateTaskProvider(req,res){
    const validatedData = matchedData(req);
    try{
    // Fetch id from validated payload
    const task = await Task.findById(validatedData._id).exec(); 
    if(!task){
        return res.status(StatusCodes.NOT_FOUND).json({
            reason: "Task not found"
        });
    }
    //update
    task.title = validatedData.title || task.title; 
    task.description = validatedData.description || task.description;
    task.status = validatedData.status || task.status;
    task.priority = validatedData.priority || task.priority;
    task.dueDate = validatedData.dueDate || task.dueDate;
    //save
    await task.save();  
    return res.status(StatusCodes.OK).json(task);
    }
    catch(error){
        errorLogger("Error updating tasks", req, error);
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(StatusCodes.BAD_REQUEST).json({
                reason: error.message
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Failed to update task please try again later"
        });
    }
}

//fetch id
//update
//task

module.exports = updateTaskProvider;