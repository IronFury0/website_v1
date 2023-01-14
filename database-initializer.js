
// mongo imports 
const mc = require("mongodb").MongoClient;
const mongoUrl = "mongodb://127.0.0.1:27017/"
const fs = require('fs');


//creates mongo connection 
mc.connect(mongoUrl, {useNewUrlParser: true}, (err, client) => {
    console.log("Connected to database!");


    // makes new database
    let db = client.db("testing"); 


    // //drops all previous collections (will throw error message if database does not exist - ignore)
    // db.dropCollection("word_arrays", (err, client) =>{ 
    //     if(!err){
    //         console.log("Cleared word arrays collection.");
    //     }		
    // });


    // let fileCount = 0;
    // //dynamic reading of sorted words JSONs
    // fs.readdir("./sorted_words", (err, files) => { 
    //     if(err){
    //         //add proper error handling 
    //         console.log(err);

    //     }else{
    //         const folderLength = files.length
    //         files.forEach(file => { //loops over JSONs in folder
                
    //             gotData = require("./sorted_words/" + file); // requires files
                
    //             //gets length of words from file name
    //             let fileName = file.split(".")[0].split("_")[2];

    //             //inserts wordle collection into database
    //             db.collection("word_arrays").insertOne({words: gotData, length: fileName}, (err, res) => { 
    //                 if (err) throw err; //add proper error handling 

    //                 fileCount++;

    //                 //closes connection on final input
    //                 if(fileCount >= folderLength){
    //                     console.log("Closing connection to database.");
    //                     client.close();
    //                 }
    //             });
    //         });
    //     } 
    // });
});






