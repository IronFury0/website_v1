
let letters = []; //array of all valid letters 

// loop through the alphabet from 'a' to 'z'
for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    // convert the numeric code to a letter and add it to the array
    letters.push(String.fromCharCode(i));
}

// loop through the alphabet from 'A' to 'Z'
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    // convert the numeric code to a letter and add it to the array
    letters.push(String.fromCharCode(i));
}


// gets array of all valid words from client 
let wholeWordArr = []
let gotSecret = "";
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let response = (JSON.parse(xhttp.responseText)); // gets stringed arr from client and parses
        wholeWordArr = response.validWords;
        gotSecret = response.secretWord;
	}
};
xhttp.open("GET", "/basicWordle/getValidArr", false);
xhttp.send();


//sets up secret word
let secretWord = gotSecret;
//let secretWord = "stott";
console.log(secretWord)

//turns secret word to upper case
var upperCaseString = secretWord.split("").map(function(letter) {
    return letter.toUpperCase();
}).join("");

let secretWordArr = upperCaseString.split("");
let checkIndexSecretWordArr = upperCaseString.split("");

//sets the intial current row and column the user should be entering text on
let currentRow = 1;
let currentCol = 1;

//sets up initial variables for game
let guessedWordArr = [];
let finishedFlag = false;

const green = "rgb(57, 122, 32)";
const yellow = "rgb(227, 189, 2)";
const grey = "rgb(68, 68, 68)";


function screenKeyPress(key){

    //checks is key is a letter and word is less then 6
    if(letters.includes(key) && currentCol <= 5){
        //de selects button after its pressed
        let keyPressed = document.querySelector(`[value=${key}]`);
        keyPressed.blur();

        letterKey(key);

    //checks if key is 'enter'
    }else if(key === "ENTER"){
        enterKey(key);

    //checks if key is 'delete'
    }else if(key === "DEL" && finishedFlag === false){
        backspaceKey();
    }
    return;
}

window.addEventListener("keydown", function(e){

    //checks if user entered key is not a letter from 'a' to 'Z' or 'backspace' or 'enter'
    if(!letters.includes(e.key) && e.key != 'Backspace' && e.key != "Enter"){
        return;
    }

    //checks if entered key is 'enter'
    if(e.key === "Enter"){
        //checks if user has entered all 5 letters on that row
        enterKey();
        return;
    }

    //checks if entered key is 'Backspace'
    if(e.key === "Backspace" && finishedFlag === false){
        //updates the previous textbox in that row to empty
        backspaceKey();
        return;
    }

    //if its not the past the 5th box add the users guess into the box
    if(currentCol <= 5){
       letterKey(e.key);
    }
})


async function enterKey(){
    if(currentCol < 5){
        console.log("less then 5");

    }else{
        //checks if entered word is invalid
        let currentWord = guessedWordArr[0] + guessedWordArr[1] + guessedWordArr[2] + guessedWordArr[3] + guessedWordArr[4];

        if(!wholeWordArr.includes(currentWord.toLowerCase())){
            console.log("not a valid word")

            document.getElementById("space").classList.toggle("hide");

            let invalid = document.getElementById("notValid")
            invalid.classList.toggle("hide");

            await delay(2000);
            invalid.classList.toggle("hide");
            document.getElementById("space").classList.toggle("hide");
            return;
 
        }

        //build checks for word
        let correctCount = 0
        for(let i = 0; i < 5; i++){
            //gets id of indexed box
            console.log(guessedWordArr[i], secretWordArr[i], checkIndexSecretWordArr)

            let checkCurrentBox = document.getElementById(`row_${currentRow}_col_${i+1}`);
            let checkCurrentScreenKey = document.querySelector(`[value=${guessedWordArr[i]}]`);

            if(guessedWordArr[i] === secretWordArr[i]){
                //sets letter to not matchable character so a second letter in a different spot doesnt match
                checkIndexSecretWordArr[i] = "/";

                correctCount++
                //changes background color of text box and key to matched at index
                checkCurrentBox.style.backgroundColor = green;
                checkCurrentBox.style.borderColor = green;

                if(checkCurrentScreenKey != null){
                    checkCurrentScreenKey.style.backgroundColor = green;
                }
                
            }else{
                //changes background color of text box and key to not matched
                checkCurrentBox.style.backgroundColor = grey;
                checkCurrentBox.style.borderColor = grey;

                if(checkCurrentScreenKey != null){
                    checkCurrentScreenKey.style.backgroundColor = grey;
                }
            }
        }
        //checks for matched word but not at index
        for(let i = 0; i < 5; i++){
            let checkCurrentBox = document.getElementById(`row_${currentRow}_col_${i+1}`);
            let checkCurrentScreenKey = document.querySelector(`[value=${guessedWordArr[i]}]`);

            //checks if 
            if(checkIndexSecretWordArr.includes(guessedWordArr[i]) &&  checkCurrentBox.style.backgroundColor != green){
                checkCurrentBox.style.backgroundColor = yellow;
                checkCurrentBox.style.borderColor = yellow;

                if(checkCurrentScreenKey != null){
                    checkCurrentScreenKey.style.backgroundColor = yellow;
                }
            }
        }

        if(correctCount >= 5){
            finishedFlag = true;
            console.log("correct")

            //displays message to user
            document.getElementById("space").classList.toggle("hide");
            document.getElementById("correctMessage").classList.toggle("hide");
            sendGotWord()
        }else{
            //sets index values back for next iteration
            guessedWordArr.length = 0;
            currentCol = 1;
            currentRow++;
        }
    }
}

function backspaceKey(){
    //if atleast one key is entered on the row delete it and go to the previous box
    if(currentCol > 1){
        guessedWordArr.pop();
        currentCol--;
        document.getElementById(`row_${currentRow}_col_${currentCol}`).value = "";
    }
}

function letterKey(letter){
    //updates the next textbox in that row and responds with the upper case version of the user entered letter
    let currentLetterUpperCase = letter.toUpperCase();
    guessedWordArr.push(currentLetterUpperCase);
    document.getElementById(`row_${currentRow}_col_${currentCol}`).value = currentLetterUpperCase;
    currentCol++;
}


//causes a delay by inputed amount 
function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
        done();
        }, n);
    });
}

function sendGotWord() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
            alert("Game finished.");
            return;
        }else if(this.readyState == 4 && this.status == 400){ //checks for bad request
            console.log("failed to send data to server")
            return;
        }
    };

    let userInfoObj = {
        username: username,
        guesses: currentRow,
        word: secretWord
    }

    xhttp.open("POST", "/basicWordle/gotWord?userInfo=" + userInfoObj, false);
    xhttp.send();
}