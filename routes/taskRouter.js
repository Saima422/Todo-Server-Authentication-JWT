const { Router } = require("express");
const {
    getAllTasks, 
    getTaskByTaskId, 
    addTask, 
    addTaskValidation,
    deleteTask,
    updateTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

// const {
//     getAllTasks, 
//     getTaskByTaskId, 
//     addTask, 
//     addTaskValidation,
//     deleteTask,
//     updateTask,
// } = require("../controllers/tasksMongoose");

const router = Router();
const postMiddleware = [auth, addTaskValidation, addTask];

router.route("/").get(auth, getAllTasks).post(postMiddleware);
router.route("/:taskId").get(auth, getTaskByTaskId).delete(auth, deleteTask).post(auth, addTaskValidation, updateTask);

module.exports = router;
