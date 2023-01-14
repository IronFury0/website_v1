const express = require('express');
const url = require("url");
let router = express.Router();

//mongo includes
const mc = require("mongodb").MongoClient;
const mongoUrl = "mongodb://127.0.0.1:27017/"
const ObjectId = require('mongodb').ObjectId;
var db;

//render login page
router.get("/login", renderLogin);

//render login (signUp version) page
router.get("/create", renderSignUp);

//updates database with new user data
router.post("/validate", validateUserInfo);

//closes session 
//router.post("/logOut", gotWord);


function renderLogin(req, res, next){
    res.render("login.pug", {flag: 0});
    return;
}

function renderSignUp(req, res, next){
    res.render("login.pug", {flag: 1});
    return;
}


function validateUserInfo(req, res, next){
    //get variables from client using url parsing
    let q = url.parse(req.url, true);
    let searchP = new URLSearchParams(q.search);
    let pass = JSON.parse(searchP.get("pass"));
    let username = JSON.parse(searchP.get("username"));
    let check = parseInt(searchP.get("check"));


    //checks if a user is already logged in
    if(req.session.loggedin != true){

        //checks for login or signup command

        //login
        if(check === 0){

            //checks if user username and password match in database
            db.collection("users").findOne({username: username, password: pass}, (err, result) => {
    
                if(result != null){

                    //sets sessions
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.userid = result._id;
                    res.status(200)
                    res.end();
                    return; 
    
                }else{
                    res.status(400)
                    res.end();
                    return; 
                }
            }); 

        //sign-up    
        }else{
           
            //checks for existing username
            db.collection("users").findOne({username: username}, (err, queryResult) => {
                
                //checks for valid credentials
                if(queryResult === null && (username != "" && pass != "")){
    
                    //inserts new user into database
                    db.collection("users").insertOne({username: username, password: pass}, (err, result) => {
                        if (err) throw err;

                        //sets sessions
                        req.session.loggedin = true;
                        req.session.username = username;
                        req.session.userid = result.insertedId;
                        res.status(200);
                        res.end();
                        return; 
    
                    });
                }else{
                    res.status(400);
                    res.end();
                    return; 
                }
            });    
        } 
    }else{
        res.status(429);
        res.end();
        return; 
    } 
}

// Initialize database connection on server side
mc.connect(mongoUrl, { useNewUrlParser: true },(err, client) => {
    if(err) throw err;
  
    db = client.db('testing');
  
    //app.listen(3000);
    //console.log("Listening on port 3000");
});

module.exports = router;