var wait = require('./waiting');
var server = require('http');

server.createServer(function(request,response){
	response.writeHead(200);
	response.write("this is dog");
	wait.waiting("processing");
	request.on("end",function(){
		response.end();
	});
}).listen(8080);