function sendUserCredentialsInfo(check){
    console.log('Got login/sign-up request');

    //removes red boxes around username and password
    document.getElementById("userName").classList.remove("error");
    document.getElementById("password").classList.remove("error");

    let username = document.getElementById("userName").value;
    let pass = document.getElementById("password").value;

    let xhttp = new XMLHttpRequest();
    ///checks for server response 
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("got a reponse good");

            if(check == 0){
                alert("User logged in");
            }else{
                alert("User Created");
            }

            window.location.href = "/main";
            return;
            
        }else if(this.readyState == 4 && this.status == 400){ //checks for bad request
            console.log("got bad request at user login/sign-up (400)");

            if(check == 0){
                alert("Invalid login credentials");
                //adds red boxes around username and password
                document.getElementById("userName").classList.add("error");
                document.getElementById("password").classList.add("error");

            }else{
                document.getElementById("userName").classList.add("error");
                alert("Username is already taken");
            }
            return;
           
        }else if(this.readyState == 4 && this.status == 429){ //checks for bad request
            console.log("too many users logged in (429)");
            alert("An account is already logged in, please log out first");
            window.location.href = "/";
            return;
        } 
        
    }
    //send to server
    xhttp.open("POST", "/user/validate?username="+ JSON.stringify(username) +  "&pass=" + JSON.stringify(pass) + "&check=" + JSON.stringify(check), false);
    xhttp.send();
    return;   
}