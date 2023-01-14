//mongo includes
const mc = require("mongodb").MongoClient;
const mongoUrl = "mongodb://127.0.0.1:27017/"
const ObjectId = require('mongodb').ObjectId;
var db;

const url = require("url");
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "pug");
app.set('views', './views');


//sets up session
app.use(session({
    secret: '2803urp3wjefpwaabjkbvnop0',
    resave: true,
    saveUninitialized: true
}));


//render homepage
app.get("/",(req, res)=> {
    res.render("startPage", {});
    return;
});

//render mainpage
app.get("/main",(req, res)=> {
    res.render("mainPage", {});
    return;
});


//router for login
let loginRouter = require("./login-router");
app.use("/user", loginRouter);

//router for basic wordle 
let basicWordleRouter = require("./basic-wordle-router");
app.use("/basicWordle", basicWordleRouter);

//router for basic wordle 
let songGuessRouter = require("./song-guess-router");
app.use("/guessSong", songGuessRouter);
 

// Initialize database connection on server side
mc.connect(mongoUrl, { useNewUrlParser: true },(err, client) => {
    if(err) throw err;
  
    db = client.db('testing');
  
    app.listen(3000);
    console.log("Listening on port 3000");
});