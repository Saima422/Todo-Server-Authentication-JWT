const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect('mongodb://localhost:27017/todoData',
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use("/tasks",taskRouter);
app.use('/user', userRouter);
app.post('/welcome', auth, (req,res) => {
    res.status(200).send('Welcome');
})

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

const port = process.env.PORT || 3000; 

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})

