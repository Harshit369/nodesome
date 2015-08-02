var socket = require('socket.io');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

server.listen(8080);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

var usernames = {};

var chatrooms = ['room1','room2'];

io.sockets.on('connection',function(client){
	console.log("client connected....");

	socket.on('adduser',function(username){
		socket.username = username;

		socket.chatroom = 'room1'

		usernames[username] = username;

		socket.join(room1);

		socket.emit('updatechat','SERVER',"Talking in room1");

		socket.broadcast.to('room1').emit('updatechat','SERVER',username+" has connected to this room");

		socket.emit('updaterooms',chatrooms,'room1');
	});

	socket.on('sendchat',function(msg){
		io.socket.in(socket.room).emit('sendchat',socket.username,msg);
	});

	socket.on('switchrooms',function(newroom){
		socket.leave(socket.chatroom);

		socket.join(newroom);

		socket.emit('updatechat','SERVER',"you have connected to "+newroom);

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username + " has left");

		socket.chatroom = newroom;

		socket.broadcast.to(socket.chatroom).emit('updatechat','SERVER',socket.username + " has joinned this room");

		socket.emit('updaterooms',chatrooms,newroom);
	});

	socket.on('disconnect',function(){
		delete usernames[socket.username];

		io.socket.emit('updateuser',usernames);

		socket.broadcast.emit('updatechat','SERVER', socket.username+" has disconnected");

		socket.leave(socket.chatroom);
	});
});