//variables needed to pull twitter information
var access = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(access.twitterKeys);

// variables needed to access spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(access.spotifyKeys);

//variable needed to call movie data
var request = require('request');

//do what it says install
var fs = require("fs");

//accepting the command
var command = process.argv[2];

switch(command) {
	case "my-tweets":
		tweet();
		break;
	case "spotify-this-song":
		songSearch();
		break;
	case "movie-this":
		movieSearch();
		break;
	case "doWhatItSays":
		doWhatItSays();
}

//functions to process command inputs
function tweet() {
	var params = {
		screen_name: '@SAClass124',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 		if (!error) {
 			for (var i=0; i<20; i++) {
 				console.log("New Tweet: ");
	 			console.log(tweets[i].text);
	 			console.log(tweets[i].created_at);
	 			console.log("-------------");
 			}
 		}
	});
};

function songSearch() {
	var song = "The Sign";

	for (var s=3; s < process.argv.length; s++){
		if (3 === s) {
			song = process.argv[s];
			console.log(song);
		} else {
			song += "+" + process.argv[s];
			console.log(song);
		};
	return song;
	};

	//console.log(song);

	var params = {
		type: "track",
		query: song
	};

	spotify.search(params, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		} else {
  			var info = data.tracks.items;

  			for (var i=0; i<info.length; i++) {
  				var album = info[i].album;
  				var artist = info[i].artists;

  				console.log(album.name);
  				console.log(artist.name);
  				console.log(info[i].name);
  				console.log(info[i].preview_url);
  				console.log("---------------------");
  			};
  		};
		//console.log(data); 
	});
};

function movieSearch() {
	var movie = "Mr. Nobody";

	for (var m=3; m < process.argv.length; m++){
		if (3 === m) {
			movie = process.argv[m];
		} else {
			movie += "+" + process.argv[m];
		};
	return movie;
	};

	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=40e9cece";

	request(queryURL, function(err, response, body) {
		if (err) {
			return console.log('Error occurred: ' + err);
		} else {
			if (err === null && response.statusCode === 200) {
				var data = JSON.parse(body);

				if (data.Year != undefined) {
					console.log("Title: " + data.Title);
					console.log("Year: " + data.Year);
					console.log("IMDB Rating: " + data.imdbRating);
					console.log("Country: " + data.Country);
					console.log("Langauge: " + data.Language);
					console.log("Plot: " + data.Plot);
					console.log("Actors: " + data.Actors);

					if (data.tomatoURL != undefined) {
						console.log("Rotten Tomatoes: " + data.tomatoURL);
					} else {
						console.log(data.Error);
					};
				};
			};
		};
	});
};

function doWhatItSays() {
	var fileName = "random.txt";

	fs.readFile(fileName, "utf8", function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		} else {
			var dataArr = data.split(",");
			var song = dataArr[1];

			songSearch();
		};
	});
};