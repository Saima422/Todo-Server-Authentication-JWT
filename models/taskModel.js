const uniqid = require("uniqid");

class Task {
    constructor({ content, createdAt, updatedAt}){
        if(this.isContentValid(content)){
            this.taskId = uniqid();
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.isComplete = false;
        }else{
            return new Error("Invalid content structure");
        }
    }

    isContentValid = (content) =>{
        if(!content){
            return false;
        }
        return true;
    }
}

module.exports = Task;