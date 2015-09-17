//requirements
var socket = require('socket.io');
var express = require('express');
var http = require('http');
var redis = require('redis');
//--------------------------

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var userset = redis.createClient();



server.listen(8080);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var usernames = {};

var chatrooms = ['Introduction'];

io.sockets.on('connection',function(socket){
	console.log("client connected....");

	socket.on('adduser',function(username){
		socket.username = username;

		socket.chatroom = 'Introduction';

		usernames[username] = username;

		socket.join('Introduction');

		socket.emit('updatechat','SERVER',"Talking in "+socket.chatroom);

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',username+" has joined");

		socket.emit('updaterooms',chatrooms,socket.chatroom);
	});

	socket.on('sendchat',function(msg){
		//console.log(msg);
		io.sockets.in(socket.chatroom).emit('updatechat',socket.username,msg);
	});

	socket.on('switchrooms',function(newroom){
		socket.leave(socket.chatroom);

		socket.join(newroom);

		socket.emit('updatechat','SERVER',"you have connected to "+newroom);

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username + " has left");

		socket.chatroom = newroom;

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username + " has joined");

		socket.emit('updaterooms',chatrooms,newroom);
	});

	socket.on('disconnect',function(){
		delete usernames[socket.username];

		io.sockets.emit('updateuser',usernames);

		socket.broadcast.emit('updatechat','SERVER', socket.username+" has disconnected");

		socket.leave(socket.chatroom);
	});

	socket.on('addnewroom',function(name){
		chatrooms.push(name);

		socket.leave(socket.chatroom);

		socket.join(name);

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username+" has left");

		socket.chatroom = name;

		socket.emit('updaterooms',chatrooms,socket.chatroom);

		socket.emit('updatechat','SERVER',"Talking in "+socket.chatroom);

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username+" has joined");

		io.sockets.emit('updatechat','SERVER',name + " has been created by " + socket.username);
	});
});