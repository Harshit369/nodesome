var server = require('http');
var rl = require('readline');

server.createServer(function(request,response){
	response.writeHead(200);
	//var interface = rl.createInterface(process.stdin,process.stdout,null);
	response.write(function(){
		interface.question("what's ur name",function(name){
			console.log("i know his name is " + name + " he is just trying to be oversmart");
		});	
	});
	response.end();
}).listen(8080);
console.log("check your browser on port 8080-----> HINT:use curl");