const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');

async function createTaskProvider(req,res){
    const validatedData = matchedData(req);
    // console.log("validatedData", validatedData);
    const task = new Task(validatedData);

    try{   
        task.save();
        return res.status(StatusCodes.CREATED).json(task);
    }
    catch(error){
        console.error("Error creating task:", error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: "Failed to create task please try again later"});
    }
}

module.exports = createTaskProvider;