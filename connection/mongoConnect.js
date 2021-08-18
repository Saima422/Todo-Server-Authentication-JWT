const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const mongoGet = async (query, userId) => {
  try {
    await client.connect();
    const database = client.db("todoData");
    const todos = database.collection(userId.toString());
    const todoD = await todos.find(query).toArray();
    return todoD;
  } 
  catch(error){
    console.log(error);
  }
  finally {
    await client.close();
  }
}

const mongoDelete = async (query, userId) => {
    try {
      await client.connect();
      const database = client.db("todoData");
      const todos = database.collection(userId.toString());
      const todoD = await todos.deleteOne(query);
      return todoD.deletedCount;
    } 
    catch(error){
      console.log(error);
    }
    finally {
      await client.close();
    }
}

const mongoAdd = async (query, userId) => {
    try {
      await client.connect();
      const database = client.db("todoData");
      const todos = database.collection(userId.toString());
      const todoD = await todos.insertOne(query);
      return todoD;
    } 
    catch(error){
      console.log(error);
    }
    finally {
      await client.close();
    }
}

const mongoUpdate = async (query, updateObj, userId) => {
    try {
      await client.connect();
      const database = client.db("todoData");
      const todos = database.collection(userId.toString());
      const todoD = await todos.updateOne(query, updateObj);
      if(await todoD){
        return await todos.findOne(query);
      }
    } 
    catch(error){
      console.log(error);
    }
    finally {
      await client.close();
    }
}

module.exports = {
    mongoGet,
    mongoDelete,
    mongoAdd,
    mongoUpdate,
}
