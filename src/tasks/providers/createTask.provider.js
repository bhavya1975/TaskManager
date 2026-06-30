const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const logger = require('../../helpers/winston.helper.js');
const errorLogger = require('../../helpers/errorLogger.helper.js');

async function createTaskProvider(req,res){
    const validatedData = matchedData(req);
    // console.log("validatedData", validatedData);
    const task = new Task(validatedData);
    try{   
        await task.save();
        return res.status(StatusCodes.CREATED).json(task);
    }
    catch(error){
        // console.error("Error creating task:", error);
        errorLogger("Error creating task", req, error);
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(StatusCodes.BAD_REQUEST).json({
                reason: error.message
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Failed to create task please try again later"
        });
    }
}
module.exports = createTaskProvider;