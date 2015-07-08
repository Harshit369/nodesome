var express = require('express');
var http = require('http');
var app = express();

app.get('/',function(request,response){
	response.sendFile(__dirname + '/index.html');
});

app.listen(8080);