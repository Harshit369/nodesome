var request = require('request');
var url = require('url');

var express = require('express');

var app = express();

//----------------------------------------------------

app.get('/:username',function(req,response){
	var username = req.params.username;

	options = {
		method: "https:",
		host: 'facebook.com'
	}

	var twitterurl = url.format(options);

	request(twitterurl).pipe(response);
});

app.listen(8080);