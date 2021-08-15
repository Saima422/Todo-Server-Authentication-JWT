const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./routes/taskRouter");
dotenv.config({ path: "./config.env" });

// const serveStatic = require('serve-static');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var showdown  = require('showdown'),
//     converter = new showdown.Converter(),
//     text      = '# hello, markdown!',
//     html      = converter.makeHtml(text);

// app.use(serveStatic('public', `${html}`));

// app.use(serveStatic('public', { 'index': ['index.html'] }))
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


app.use("/tasks",taskRouter);


// app.listen(3000, ()=>{
//     console.log("Server started at port 3000");
// });

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server Started on port ${process.env.PORT || "3000"} `);
})
