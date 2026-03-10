const {model, Schema} = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String, 
        required: [true, "Title is required"],
        trim: true,
        maxLength: [100, "Title cannot be more than 100 characters"]
    },
    description: {
        type: String, 
        required: [true, "Description is required"],
        trim: true,
        maxLength: [500, "Description cannot be more than 500 characters"]
    },
    status:{
        type: String,
        required: [true, "Status is required"],
        enum: ["todo", "inProgress", "completed"],
        default: "todo"
    },
    priority:{
        type: String,
        required: [true, "priority is required"],
        enum: ["normal", "low", "high"],
        default: "normal"
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},
{timestamps: true, versionKey: false}
);



const Task = model("Task", taskSchema);

module.exports = Task;