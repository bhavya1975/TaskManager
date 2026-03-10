const express = require('express');
const authRouter = express.Router();
const authController = require("./auth.controller.js");

authRouter.post("/login",(req,res)=>{
    authController.handleLogin(req,res);
});

module.exports = authRouter;