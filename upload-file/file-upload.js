var server = require("http");
var stream = require("fs");

server.createServer(function(request,response){
	var writefile = stream.createWriteStream("filecopy.html");
	response.writeHead(200);
	request.pipe(writefile);

	var filesize = request.headers['content-length'];

	var uploaded = 0;

	request.on('data',function(data){
		uploaded += data.length;
		var percent = (uploaded/filesize)*100;
		response.write("uploaded: " + parseInt(percent,10) + "%\n");
	})

	request.on('end',function(){
		response.end("file uploaded");
	});
}).listen(8080);