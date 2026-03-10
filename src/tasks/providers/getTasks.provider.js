const Task = require('../tasks.schema.js');

async function getTasksProvider(req,res){
    return await Task.find();
    // return tasks;
}
module.exports = getTasksProvider;