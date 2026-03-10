const express = require('express');
const usersRouter = express.Router();


const usersController = require("./users.controller.js");

usersRouter.post("/create",(req,res)=>{
    usersController.handleCreateuser(req,res);
});

module.exports = usersRouter;