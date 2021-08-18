const todoList = require("../models/schema.js");

const getAllTasks = async (req,res,next) =>{
    const todos = await todoList.find({});

    try {
        res.send(todos);
      } catch (error) {
        res.status(500).send(error);
      }
};


const getTaskByTaskId = async (req, res, next) => {
    let { taskId } = req.params;

    const todo = await todoList.find({_id: taskId});

    try {
        res.send(todo);
      } catch (error) {
        res.status(500).send(error);
      }
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

    const newTask = new todoList(req.body);

    try {
        await newTask.save();
        res.send(newTask);
      } catch (error) {
        res.status(500).send(error);
      }
};


const deleteTask = async(req, res, next) => {

    let { taskId } = req.params;
        // returns status obj
        // {"n": 1,"ok": 1,deletedCount": 1}
    // let resData = await todoList.deleteOne({_id: taskId});
        // returns previous value of deleted obj
    let resData = await todoList.findByIdAndDelete(taskId);

    try {
        res.send(resData);
        // res.status(204);
      } catch (error) {
        res.status(500).send(error);
      }
};

const updateTask = async (req, res, next) => {

    let { taskId } = req.params;

    // returns previous value of updated obj
    let resData = await todoList.findByIdAndUpdate(taskId, req.body);
    // returns status obj
    // let resData = await todoList.updateOne({_id: taskId}, req.body);

    try{
        res.send(resData);
    }catch(error){
        res.status(500).send(error);
    }
};

module.exports = {
    getAllTasks,
    getTaskByTaskId,
    addTask,
    deleteTask,
    updateTask,
    addTaskValidation,
}