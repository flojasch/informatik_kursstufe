var socket = io();
let img;
let earthimg;
let planets = [];
let playerpos = 500;
let myId = 0;
let me;

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  forward: false,
  backward: false
}


function setup() {
  // img = loadImage('static/jupitermap.jpg');
  earthimg = loadImage('static/earth.jpg');
  spaceship = loadModel('static/teapot.obj', true);
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        let earth = new Planet(200 * i - 300, 200 * j - 300, 200 * k - 300, 30);
        planets.push(earth);
      }
    }
  }
  ambientLight(50);
  directionalLight(200, 200, 200, -1, 1, -1);
}

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: // keyleft
      movement.left = true;
      break;
    case 38: // keyup
      movement.up = true;
      break;
    case 39: // keyright
      movement.right = true;
      break;
    case 40: // keydown
      movement.down = true;
      break;
    case 87: //w
      movement.forward = true;
      break;
    case 83: //d
      movement.backward = true;
      break;
  }
});
document.addEventListener('keyup', function (event) {
  switch (event.keyCode) {
    case 37: // keyleft
      movement.left = false;
      break;
    case 38: // keyup
      movement.up = false;
      break;
    case 39: // keyright
      movement.right = false;
      break;
    case 40: // keydown
      movement.down = false;
      break;
    case 87: //w
      movement.forward = false;
      break;
    case 83: //s
      movement.backward = false;
      break;
  }
});

socket.emit('new player');
socket.on('id', function (id) {
  if (myId === 0) {
    myId = id;
  }
});

setInterval(function () {
  socket.emit('movement', movement);
}, 1000 / 60);

socket.on('state', function (players) {
  // console.log(players);
  background(0);
  me=players[myId]||{};
  push();
  showMe(me);

  for (var id in players) {
    if (id != myId) {
      var player = players[id];
      showOthers(player);
    }
  }
  for (let planet of planets) {
    planet.show();
  }
  pop();
});

function showMe(player) {
  translate(0, 0, playerpos);
  push();
  rotateX(PI);
  rotateY(-PI / 2);
  scale(0.4);
  normalMaterial();
  model(spaceship);
  pop();
  rotateX(player.xAngle);
  rotateY(player.yAngle);
  translate(0, 0, -playerpos);
  translate(player.x, player.y, player.z);
}

function showOthers(player) {
  push();
  translate(player.x, player.y, player.z);
  rotateX(PI);
  rotateY(-PI / 2);
  scale(0.4);
  normalMaterial();
  model(spaceship);
  pop();
}

class Planet {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }
  show() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(millis() / 1000);
    texture(earthimg);
    noStroke();
    sphere(this.r);
    pop();
  }
}