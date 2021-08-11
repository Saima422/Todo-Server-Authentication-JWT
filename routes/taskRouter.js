const { Router } = require("express");
const {
    getAllTasks, 
    getTaskByTaskId, 
    addTask, 
    addTaskValidation,
    deleteTask,
    updateTask,
} = require("../controllers/taskController");

const router = Router();
const postMiddleware = [addTaskValidation, addTask];

router.route("/").get(getAllTasks).post(postMiddleware);
router.route("/:taskId").get(getTaskByTaskId).delete(deleteTask).post(addTaskValidation, updateTask);

module.exports = router;