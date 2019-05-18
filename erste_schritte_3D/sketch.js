let planets = [];
let xAngle = 0;
let yAngle = 0;
let x = 0;
let y = 0;
let z = 0;
let spaceship;
let playerpos=500;

function preload() {
  img = loadImage('earth.jpg');
  spaceship = loadModel('teapot.obj',true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // cam = createCapture(VIDEO);
  // cam.hide();
  for(let i=0;i<6;i++){
    for(let j=0;j<6;j++){
      for(let k=0;k<6;k++){
        let shift=250;
        let earth=new Planet(100*i-shift,100*j-shift,100*k-shift,30);
        planets.push(earth);
      }
    }
  }
  ambientLight(100);
  directionalLight(200, 200, 200, 1, -1, -1);
}


function steering() {
  if (keyCode == UP_ARROW) {
    xAngle += 0.01;
  }
  if (keyCode == DOWN_ARROW) {
    xAngle -= 0.01;
  }
  if (keyCode == RIGHT_ARROW) {
    yAngle += 0.01;
  }
  if (keyCode == LEFT_ARROW) {
    yAngle -= 0.01;
  }
  if (key == 'e') {
    newPos(2);
  }
  if (key == 'd') {
    newPos(-2);
  }
}

function newPos(incr) {
  x += incr * sin(-yAngle) * cos(xAngle);
  y += incr * sin(xAngle);
  z += incr * cos(yAngle) * cos(xAngle);

}

function draw() {
  background(0);
  translate(0, 0, playerpos);
  showPlayer();
  rotateX(xAngle);
  rotateY(yAngle);
  translate(0, 0, -playerpos);
  translate(x, y, z);

  if (keyIsPressed) {
    steering();
  }
  for (let planet of planets) {
    planet.show();
  }

}

function showPlayer(){
  push();
  rotateX(PI);
  rotateY(-PI/2);
  scale(0.2);
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
    texture(img);
    noStroke();
    sphere(this.r);
    pop();
  }
}