const { MongoClient } = require("mongodb");

const uri =
  "mongodb://localhost:27017/todoData";

const client = new MongoClient(uri);

// const createUser = async (id) => {
//     try{
//         await client.connect();
//         const todoData = client.db('todoData');
//         const users = todoData.collection(id.toString());
//         // const resData = await users.insertOne({"name": "saima"});
//         // return resData;
//     }
//     catch(err){
//         console.log(err);
//     }
//     finally{
//         await client.close();
//     }
// }

const getUser = async (query) => {
    try{
        await client.connect();
        const todoData = client.db('todoData');
        const users = todoData.collection('todo-users');
        const resData = await users.find(query).toArray();
        return resData;
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}

const addUser = async (query) => {
    try{
        await client.connect();
        const todoData = client.db('todoData');
        const users = todoData.collection('todo-users');
        const resData = await users.insertOne(query);
        return resData;
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}

module.exports = {
    getUser,
    addUser
}