require(".env.txt").config();



var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var liriArgument = process.argv[2];




    
    switch(liriArgument) {
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
        case "concert-this": concertThis(); break;
        case "do-what-it-says": doWhatItSays(); break;
		// Instructions displayed in terminal to the user
		default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
			"1. spotify-this-song 'any song name' "+"\r\n"+
			"2. movie-this 'any movie name' "+"\r\n"+
            "3. concert-this 'band-name' "+"\r\n"+
            "4. do-what-it-says."+"\r\n"+
            "Be sure to put the movie or song name in quotation marks if it's more than one word.");
    };
    

    function movieThis(){
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		params = movie
		request("http://www.omdbapi.com/?i=tt3896198&apikey=54f23bd0" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				//console.log(movieObject); // Show the text in the terminal
				var movieResults =
				"------------------------------ begin ------------------------------" + "\r\n"
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
				"------------------------------ fin ------------------------------" + "\r\n";
				console.log(movieResults);
				log(movieResults); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
    };
    
    function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "I want it that way";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"------------------------------ " + i + " ------------------------------" + "\r\n";
						console.log(spotifyResults);
						log(spotifyResults); // calling log function
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
    };
    







	function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
    };
    

	function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}