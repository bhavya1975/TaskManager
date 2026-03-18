const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const logger = require('../../helpers/winston.helper.js');

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
        logger.error(`Error creating task: ${error.message}`,{
                metadata: {
                    errorCode: error.code,
                    errorName: error.name,
                    method: req.method,
                    url: req.originalUrl,
                    body: req.body,
                    error: error,

                }
            });
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: "Failed to create task please try again later"});
    }
}

module.exports = createTaskProvider;