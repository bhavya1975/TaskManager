const Task = require('../tasks.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');

async function deleteTaskProvider(req,res){
    const validatedData = matchedData(req);
    try{
        const task = await Task.deleteOne({_id:req.body["_id"]});
        return res.status(StatusCodes.OK).json(task);
    }
    catch(error){
        errorLogger("Error deleting task", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request please try again later"
        });
    }
    //
    return await Task.deleteOne({_id:req.body["_id"]});
}
module.exports = deleteTaskProvider;