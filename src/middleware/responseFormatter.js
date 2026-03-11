const {getReasonPhrase} = require('http-status-codes');

function responseFormatter(req,res,next){
    const originalJson = res.json;

    res.json = (data) => {
        const response = {
            status: res.statusCode >= 200 && res.statusCode < 300 ? "success" : "error",
            statusCode: res.statusCode, 
            message: getReasonPhrase(res.statusCode),
            data: res.statusCode >= 200 && res.statusCode < 300 ? data : null,
            error: res.statusCode >= 200 && res.statusCode < 300 ? null : data
        };

        originalJson.call(res, response); // the middleware will integrate express builtin reposen method without affecting the existisng code.
        // method of overridden like it is a boiler for our reponse. 

    };
    next();
}

module.exports = responseFormatter;
//when respose is sent back by taskcontroller

// what this function would basically do

// res.status(StatusCodes.OK).json({
//         status: "success",
//         StatusCodes : StatusCodes.OK,
//         message : ReasonPhrases.OK,
//         data: response
//     });