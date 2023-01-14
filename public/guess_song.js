
//globals
let songTrack


async function getSong() {

    //waits for server to send spotify credentials to client
    const getSpotifyData = await fetch("/guessSong/getToken", {});  
    const gotSpotifyData = await getSpotifyData.json();

    //calls spotify api to validate spotify credentials
    const getValidateData = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(gotSpotifyData.id + ':' + gotSpotifyData.secret)
      },
      body: 'grant_type=client_credentials'
    }); 

    const gotValidateData = await getValidateData.json();
    
    //calls spotify api to search for song
    const getSong = await fetch(`https://api.spotify.com/v1/search?q=track:${encodeURIComponent(gotSpotifyData.songName)}%20artist:${encodeURIComponent(gotSpotifyData.artistName)}&type=track`, {
      method: 'GET',  
      headers: {
          'Authorization': 'Bearer ' + gotValidateData.access_token
        }
    });

    const gotSong = await getSong.json();
    songTrack = gotSong.tracks.items[0];
    console.log(songTrack.name + ' by ' + songTrack.artists[0].name);

}


async function playSong() {

  //catches if user clicks play song before the making the call to the server to get spotify details and song details 
  let audio;
  try {

    audio = new Audio(songTrack.preview_url);

  } catch (error) {

    console.log("failed (has no song or spotify details yet)")
    alert("Must click GET SONG first")
    return; 
  }
 
  audio.currentTime = 0;
  
  audio.play();

  //keeps track of time of audio played and pauses 
  const interval = setInterval(function () { 
    //console.log(audio.currentTime); // will get you a lot more updates.
    if(audio.currentTime >= 1){
      console.log("paused")
      audio.pause();
      clearInterval(interval) //breaks out from set interval checking
    }
  }, 30);

}


function guess() {
}
