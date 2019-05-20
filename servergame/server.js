// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

var players = {};
io.on('connection', function (socket) {
  socket.on('new player', function () {
    players[socket.id] = {
      x: 0,
      y: 0,
      z: 0,
      xAngle: 0,
      yAngle: 0
    };
    io.sockets.emit('id', socket.id);
  });
  socket.on('deleteplayer',function(id){
    delete players[id];
  }); 
  socket.on('movement', function (data) {
    var player = players[socket.id] || {};
    if (data.left) {
      // player.x-=5;
      player.yAngle -= 0.01;
    }
    if (data.up) {
      // player.y+=5;
      player.xAngle -= 0.01;
    }
    if (data.right) {
      // player.x+=5;
      player.yAngle += 0.01;
    }
    if (data.down) {
      // player.y-=5;
      player.xAngle += 0.01;
    }
    if (data.forward) {
      newPos(2, player);
    }
    if (data.backward) {
      newPos(-2, player);
    }
    if (data.projectile) {
      let projectile = {
        x: player.x,
        y: player.y,
        z: player.z,
        xAngle: player.xAngle,
        yAngle: player.yAngle,
        id: socket.id
      };
      io.sockets.emit('projectile', projectile);
    }
  });
});

function newPos(incr, player) {
  player.x += incr * Math.sin(-player.yAngle) * Math.cos(player.xAngle);
  player.y += incr * Math.sin(player.xAngle);
  player.z += incr * Math.cos(player.yAngle) * Math.cos(player.xAngle);
}

setInterval(function () {
  io.sockets.emit('state', players);
}, 1000 / 60);