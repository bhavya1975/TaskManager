const {StatusCodes,ReasonPhrases} = require('http-status-codes')
const createTaskProvider = require('./providers/createTask.provider.js');
const getTasksProvider = require('./providers/getTasks.provider.js');
const updateTaskProvider = require('./providers/updateTask.provider.js');
const deleteTaskProvider = require('./providers/deleteTask.provider.js');

async function handleGetRequest(req,res){
    return await getTasksProvider(req,res);
    // res.status(StatusCodes.OK).json(tasks);
}
// res.status(StatusCodes.OK).json({
    //     status: "success",
    //     StatusCodes : StatusCodes.OK,
    //     message : ReasonPhrases.OK,
    //     data: response
    // });
    // data successafully sent to the client when 200 we use http status code library.  

    // res.status(StatusCodes.OK).json(response);
    
async function handlePostRequest(req,res){
    return await createTaskProvider(req,res);
}

async function handlePatchRequest(req,res){
    return await updateTaskProvider(req,res);
}

async function handleDeleteRequest(req,res){
    return await deleteTaskProvider(req,res);
}


module.exports = {
    handleGetRequest,
    handlePostRequest,
    handlePatchRequest,
    handleDeleteRequest
}