const express = require("express")
const jwt = require("jsonwebtoken")
const app = express();
const JWT_SECRET_key = "mykey";
const users = []


app.use(express.json()); //to convert the body data into JS object


app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.send({
        message: "You are signup"
    })
})


app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    
    const user = users.find(user => user.username === username && user.password === password);
    
    if(user){
       const token = jwt.sign({
        username: user.username
       },JWT_SECRET_key)

       res.json({
          token: token
       })
    }
    else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})


app.get("/me", function(req,res){
    const token = req.headers.token;
    const userInfo = jwt.verify(token, JWT_SECRET_key);

    const username = userInfo.username;
    const user = users.find(user => user.username === username);

    if(user){
        res.json({
           username: user.username,
           password: user.password
        })
    }
    else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})


app.listen(3000);


