const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');
async function getTasksProvider(req,res){
    const data = matchedData(req);
    try{
        const query = await Task.find();
        return res.status(StatusCodes.OK).json(query);
    }
    catch(error){
        errorLogger("Error fetching tasks", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json(
            {reason: "Failed to fetch tasks please try again later"}
        );
    }
    // return await Task.find();
    // return tasks;
}
module.exports = getTasksProvider;