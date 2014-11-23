var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axis = 0;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/test.html');
});


io.on('connection', function(socket){
	console.log("connected");
   socket.on('cube claim', function(msg){
		console.log("got a cube claim");
		socket.broadcast.emit('cube claim', msg); 
   });
   socket.emit('generated axis', (axis++ % 3));
});

var port = 8080;

http.listen(port, function(){
   console.log('listening on ' + port); 
});