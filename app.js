const path = require("path");
const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./routes/taskRouter");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let text= `<embed type="text/markdown" src="https://saima422.github.io/mardown-trial/" height="100%" width="100%"/>`;

fs.writeFileSync("./public/index.html", text);

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use("/tasks",taskRouter);

const port = process.env.PORT || 3000; 

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
})
