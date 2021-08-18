const { getUser, addUser} = require('../connection/userConnection');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
let resData

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const userRegister = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    if(!(firstname && lastname && email && password)){
        res.status(400).send("All inputs are required");
    }

    const olduser = await getUser({email});

    if(olduser.length > 0){
        return res.status(409).send("User Already Exists. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    let userObj = {
        firstname,
        lastname,
        email,
        password: encryptedPassword
    }

    const user = new User(userObj);
    resData = await addUser(user);

    return res.status(409).send(resData);
}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!(email && password)){
        return res.status(400).send("All inputs are required");
    }

    resData = await getUser({email});
    let resId = resData[0]._id.toString()

    if(resData && (bcrypt.compare(password, resData[0].password))){
        const token = jwt.sign(
            { userId: resId, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '2h',
            }
        );
        resData[0].token = token;

        return res.status(200).json(resData);
    }
    return res.status(400).send("Invalid Credentials");
}

module.exports ={
    userRegister,
    userLogin
}