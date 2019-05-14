var socket = io();

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ambientLight(50);
  directionalLight(200, 200, 200, -1, 1, -1);
}

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function () {
  socket.emit('movement', movement);
}, 1000 / 60);

socket.on('state', function (players) {
  console.log(players);
  background(0);
  for (var id in players) {
    var player = players[id];
    push();
    translate(player.x, player.y, 0);
    rotateY(millis() / 1000);
    //texture(img);
    noStroke();
    sphere(100);
    pop();
  }
});