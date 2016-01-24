var request = require('request');
var querystring = require('querystring');
var url = require('url');

var express = require('express');

var app = express();

//---------------------------------------------------
//standard variables

var host = 'football-api.com';
var api_key = '50058c89-18bd-95e8-06724d6079b5';

//----------------------------------------------------

app.get('/api',function(req,response){
	var username = req.params.username;

	options = {
		method: "GET",
		host: host,
	}

	var apiurl = url.format(options);
	var apicall = querystring.stringify(apiurl)
	apicall += '?' + 'Action=competitions&APIKey='+api_key;


	request(twitterurl).pipe(response);
});

app.listen(8080);