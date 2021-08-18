const sendResponse = require("../utils/sendResponse");
const { mongoGet, mongoDelete, mongoAdd, mongoUpdate } = require("../connection/mongoConnect.js");
const { ObjectId } = require("mongodb");
const Task = require("../models/taskModel");
let resData;

const getAllTasks = async (req,res,next) =>{

    resData = await mongoGet({}, req.user.userId);
    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully fetched all tasks",
        data: resData,
    });
};

const getTaskByTaskId = async (req, res, next) => {
    let { taskId } = req.params;

    if(!ObjectId.isValid(taskId)){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Invalid Id",
            error: "Invalid Id"
        });
    }

    resData = await mongoGet({ _id: new ObjectId(taskId)}, req.user.userId);

    if(resData.length === 0 || !resData){
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
        data: resData
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

const addTask = async (req, res, next) => {

    const newTask = new Task(req.body);

    resData = await mongoAdd(newTask, req.user.userId);
    let resObj = await mongoGet({ _id: new ObjectId(resData.insertedId)}, req.user.userId);

    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully Added task",
        data: resObj,
    });
};

const deleteTask = async (req, res, next) => {
    let { taskId } = req.params;

    if(!ObjectId.isValid(taskId)){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Invalid Id",
            error: "Invalid Id"
        });
    }

    resData = await mongoDelete({ _id: new ObjectId(taskId)}, req.user.userId);
    if(!resData){
        return sendResponse({
            res,
            statusCode: 500,
            message: "An error occured during delete",
            error: "Invalid Id",
        });
    }
   
    return sendResponse({
        res,
        statusCode: 204,
        message: "successfully deleted task",
    });
};

const updateTask = async (req, res, next) => {
    let { taskId } = req.params;

    if(!ObjectId.isValid(taskId)){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Invalid Id",
            error: "Invalid Id"
        });
    }

    resData = await mongoUpdate({ _id: new ObjectId(taskId)}, { $set: req.body}, req.user.userId);

    if(await !resData){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Invalid Id",
            error: "Invalid Id",
        });
    }

    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully updated task",
        data: resData,
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