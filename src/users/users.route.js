const express = require('express');
const usersController = require('./users.controller.js');
const createUserValidator = require('./validators/createUser.validator.js');
const {statusCodes} = require('http-status-codes');
const {validationResult} = require('express-validator');

const usersRouter = express.Router();

usersRouter.post("/create",createUserValidator,(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return usersController.handleCreateUser(req,res);
    }
    else{
        return res.status(400).json({errors: result.array()});
    }
});

module.exports = usersRouter;