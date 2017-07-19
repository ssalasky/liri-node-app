//variables needed to pull twitter information
var access = require("./keys.js");
var key = access.twitterKeys;
var Twitter = require('twitter');

//variables needed to access spotify
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
var Spotify = require('node-spotify-api');

//variable needed to call movie data
var request = require('request');


var command = process.argv[2];

if (command === "my-tweets") {
	var params = {screen_name: 'nodejs'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 		if (!error) {
    		console.log(tweets);
 		}
	});
};

if (command === "spotify-this-song") {
	var song = process.argv[3];

	spotify.search({type: 'track', query: song}, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
		console.log(data); 
	});
};

if (command === "movie-this") {
	var movie = process.argv[2];

	var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movie;

	$.ajax {
		url: queryURL,
		method: "GET"
	}.done function() {
		console.log(response);
	};
};