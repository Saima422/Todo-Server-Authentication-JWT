const fs = require("fs");
const path = require("path");
const Task = require("../models/taskModel");
const filepath = path.join(__dirname, "..","data", "tasks.json");
const Tasks = JSON.parse(fs.readFileSync(filepath, "utf-8"));
const sendResponse = require("../utils/sendResponse");


const getAllTasks = (req,res,next) =>{
    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully fetched all tasks",
        data: Tasks,
    });
};

const getTaskByTaskId = (req, res, next) => {
    let { taskId } = req.params;
    let foundTask = Tasks.find((task) => task.taskId === taskId);
    if(!foundTask){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Element Not Found",
            error: "Invalid Id"
        });
    } 
    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully fetched task",
        data: foundTask
    });
};

const addTaskValidation = (req, res, next) => {

    let validKeys = ["content", "createdAt", "updatedAt"];

    if(req.params.taskId){
        validKeys = ["content", "isComplete", "createdAt", "updatedAt"];
    }

    if(!req.body.content){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Invalid Request",
            error: "Invalid Request",
        });
    }
    else{
        if(validKeys.length !== Object.keys(req.body).length){
            return sendResponse({
                res,
                statusCode: 400,
                message: "Invalid Request",
                error: "Invalid Request",
            });
        }
        flag = validKeys.every((key)=>Object.keys(req.body).includes(key));
        if (!flag){
            return sendResponse({
                res,
                statusCode: 404,
                message: "Invalid Request",
                error: "Invalid Request",
            });
        }
        next();
    }
};

const addTask = (req, res, next) => {
    const newTask = new Task(req.body);
    Tasks.push(newTask);

    fs.writeFile(filepath, JSON.stringify(Tasks, null, 2), (err)=> {
        if(err){
            Tasks.pop();

            return sendResponse({
                res,
                statusCode: 500,
                message: "An error occured while writing file",
                error: err,
            });
        }

        return sendResponse({
            res,
            statusCode: 200,
            message: "successfully Added task",
            data: newTask,
        });
    });
};

const deleteTask = (req, res, next) => {
    let index = Tasks.findIndex( item => item.taskId === req.params.taskId );
    if(index === -1){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Task with id not found",
        });
    }
    Tasks.splice(index, 1);

    fs.writeFile(filepath, JSON.stringify(Tasks, null, 2), (err)=>{
        if(err){
            return sendResponse({
                res,
                statusCode: 500,
                message: "An error occured while writing file during delete",
                error: err,
            });
        }

        return sendResponse({
            res,
            statusCode: 200,
            message: "successfully deleted task",
        });
    });
};

const updateTask = (req, res, next) => {
    let index = Tasks.findIndex( item => item.taskId === req.params.taskId );

    if(index === -1){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Task with id not found",
        });
    }

    Object.keys(req.body).forEach((key)=>{
        Tasks[index][key] = req.body[key];
    });

    fs.writeFile(filepath, JSON.stringify(Tasks, null, 2), (err)=>{
        if(err){
            return sendResponse({
                res,
                statusCode: 500,
                message: "An error occured while writing file during update",
                error: err,
            });
        }
        return sendResponse({
            res,
            statusCode: 200,
            message: "successfully updated task",
            data: Tasks[index]
        });
    });  
};

module.exports = {
    getAllTasks,
    getTaskByTaskId,
    addTask,
    addTaskValidation,
    deleteTask,
    updateTask,
}