const express = require('express');
const url= require("url");
let router = express.Router();

//render homepage
router.get("/", renderPage);

//sends valid arr to client
router.get("/getValidArr", sendValidArr);

//updates database with client data
router.post("/gotWord", gotWord);


function renderPage(req, res, next){
    res.render("5_length_wordle.pug", {});
    return;
}


function sendValidArr(req, res, next){

    let validArr = require("./sorted_words/words_length_5.json");
    
    //gets pseudo random number in the range of the array
    let index = Math.floor(Math.random() * validArr.length);
    
    res.write(JSON.stringify({validWords: validArr, secretWord: validArr[index]}));
    res.end();
    return; 
}

function gotWord(req, res, next){
    

}

module.exports = router;
    
