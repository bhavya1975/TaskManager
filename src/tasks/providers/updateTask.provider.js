const Task = require('../tasks.schema.js');

async function updateTaskProvider(req,res){
    //fetch id
    const task = await Task.findById(req.body["_id"]);
    if(!task){
        throw new Error("Task not found");
    }
    //update
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.priority = req.body.priority;
    task.dueDate = req.body.dueDate;
    //save
    return await task.save();  
}

//fetch id
//update
//task

module.exports = updateTaskProvider;