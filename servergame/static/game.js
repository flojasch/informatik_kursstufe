var socket = io();
let img;
let earthimg;
let planets = [];
let projectiles = [];
let explosions = [];
let playerpos = 500;
let myId = 0;
let me;
let lasersound;
let bombsound;
let score = 0;
let lives = 4;
let text;
let fireBreak = 0;



var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  forward: false,
  backward: false,
  projectile: false
}


function setup() {
  // img = loadImage('static/jupitermap.jpg');
  earthimg = loadImage('static/earth.jpg');
  spaceship = loadModel('static/teapot.obj', true);
  expimg = loadImage('static/explosion.jpg');
  lasersound = loadSound('static/laser.wav');
  bombsound = loadSound('static/bomb.wav');
  createCanvas(windowWidth, windowHeight, WEBGL);
  text = createP();
  text.position(20, 20);
  text.style('font-size', '200%');
  text.style('color', 'ffffff');
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
    case 32: //space
      if (fireBreak == 0) {
        movement.projectile = true;
        lasersound.play();
      } else {
        movement.projectile = false;
      }
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
    case 32: //space
      movement.projectile = false;

  }
});

socket.emit('new player');
socket.on('id', function (id) {
  if (myId === 0) {
    myId = id;
  }
});
socket.on('projectile', function (p) {
  let projectile = new Projectile(p.x, p.y, p.z, p.xAngle, p.yAngle, p.id);
  projectiles.push(projectile);
  console.log(p.id);
  if (p.id == myId) {
    movement.projectile = false;
    fireBreak = 30;
  }
});

setInterval(function () {
  socket.emit('movement', movement);
}, 1000 / 60);

socket.on('state', function (players) {
    // console.log(players);
    background(0);
    if (fireBreak != 0) {
      fireBreak--;
    }
    text.html('Score: ' + score + '   Lives: ' + lives);
    me = players[myId] || {};
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
    updateProjectiles(players);
    for (let i = 0; i < explosions.length; i++) {
      let exp = explosions[i];
      exp.update();
      exp.show();
      if (exp.time > 100) {
        explosions.splice(i, 1);
      }
    }
    pop();
});

function updateProjectiles(players) {
  for (let i = 0; i < projectiles.length; i++) {
    let deleteP = false;
    let p = projectiles[i];
    p.update();
    p.show();
    for (let id in players) {
      player = players[id];
      if (p.hit(player)) {
        deleteP = true;
        if (id == myId) {
          playerIsHit(id);
        }
      }
    }
    for (let j = 0; j < planets.length; j++) {
      let pl = planets[j];
      if (p.hit(pl)) {
        deleteP = true;
        planets.splice(j, 1);
      }
    }

    if (abs(p.x) > 6000 || abs(p.y) > 6000 || abs(p.z) > 6000) {
      projectiles.splice(i, 1);
    }
    if (deleteP) {
      projectiles.splice(i, 1);
      bombsound.play();
      explosions.push(new Explosion(p.x, p.y, p.z));
      if (p.id === myId) {
        score += 100;
        console.log(score);
      }
    }
  }
}

function playerIsHit(id) {
  lives--;
  if (lives == 0) {
    let t = createP();
    t.position(width / 2 - 300, height / 2 - 100);
    t.style('font-size', '800%');
    t.style('color', 'ff0000');
    t.html('Game Over');
    socket.emit('deleteplayer', id);

  }
}

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
  translate(-player.x, -player.y, -player.z);
  translate(0, 0, playerpos);
  rotateY(-player.yAngle);
  rotateX(-player.xAngle);
  rotateX(PI);
  rotateY(-PI / 2);
  scale(0.4);
  normalMaterial();
  model(spaceship);
  pop();
}