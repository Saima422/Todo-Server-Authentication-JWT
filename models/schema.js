const mongoose = require("mongoose");
// const uniqid = require("uniqid");

const TodoListSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: uniqid(),
    // },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    }
});

const todoList = mongoose.model("tododLists", TodoListSchema);

module.exports = todoList;