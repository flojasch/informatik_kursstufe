var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/static', express.static(__dirname + '/static'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

let players = {};

io.on('connection', function (socket) {
  socket.on('new player', function () {
    players[socket.id] = {
      x: 200,
      y: 200,
    };
  });
  // console.log(players);
  socket.on('neue bewegung', function (data) {
    let player = players[socket.id] || {};
    if (data.left) {
      player.x-=5;
    }
    if (data.up) {
      player.y-=5;
    }
    if (data.right) {
      player.x+=5;
    }
    if (data.down) {
      player.y+=5;
    }
  });
});

setInterval(function () {
  io.sockets.emit('state', players);
}, 1000 / 60);