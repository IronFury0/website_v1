const express = require('express');
const url= require("url");
let router = express.Router();

//render homepage
router.get("/", renderPage);

router.get("/getToken", getSpotifyTokens);

function renderPage(req, res, next){
    res.render("guess_song.pug", {});
    return;
}

function getSpotifyTokens(req, res, next){

    const spotifyId = '0f640661121c491e9fa27c5ca0128409';
    const spotifySecret = '0f6675cb932e42498465ff0512e12950';
    const songName = "lithium";
    const artistName = "nirvana"

    res.write(JSON.stringify({id: spotifyId, secret: spotifySecret, songName: songName, artistName: artistName}));
    res.end();
    return;
}

module.exports = router;
    
