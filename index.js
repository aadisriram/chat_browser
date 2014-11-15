var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connected = 0;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.set('port', process.env.PORT || 3000);

io.on('connection', function(socket){
  connected++;
  socket.on('chat_message', function(msg){
    io.emit('chat_message', msg);
  });

  socket.on('disconnect', function(){
    connected--;
    io.emit('disconnected', connected);
  });

  io.emit('connected', connected);
});

http.listen(app.get('port'));
