const express = require('express');
const tasksController = require("./tasks.controller.js");

const tasksRouter = express.Router();

tasksRouter.get("/tasks",tasksController.handleGetRequest);

tasksRouter.post("/tasks",tasksController.handlePostRequest);

tasksRouter.patch("/tasks",tasksController.handlePatchRequest);

tasksRouter.delete("/tasks",tasksController.handleDeleteRequest);

module.exports = tasksRouter;