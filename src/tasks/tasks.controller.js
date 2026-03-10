const {StatusCodes,ReasonPhrases} = require('http-status-codes')
const createTaskProvider = require('./providers/createTask.provider.js');
const getTasksProvider = require('./providers/getTasks.provider.js');


async function handleGetRequest(req,res){
    const tasks = await getTasksProvider(req,res);
    res.status(StatusCodes.OK).json(tasks);



    // res.status(StatusCodes.OK).json({
    //     status: "success",
    //     StatusCodes : StatusCodes.OK,
    //     message : ReasonPhrases.OK,
    //     data: response
    // });
    // data successafully sent to the client when 200 we use http status code library.  

    // res.status(StatusCodes.OK).json(response);

}

async function handlePostRequest(req,res){
    const task = await createTaskProvider(req,res);
    res.status(StatusCodes.CREATED).json(task);
}

function handlePatchRequest(req,res){
    res.send("patch task controller");
}

function handleDeleteRequest(req,res){
    res.send("delte task controller");
}

module.exports = {
    handleGetRequest,
    handlePostRequest,
    handlePatchRequest,
    handleDeleteRequest
    
}