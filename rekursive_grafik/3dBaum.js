let gen;
let slider;
let angle;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  slider = createSlider(0, PI / 2, PI/3, 0.01);
  slider.position(50,50);
  gen = 0;
}

function mousePressed() {
  gen++;
}

function draw() {
  background(100);
  directionalLight(250, 250, 250, -1, -1, -0.5);
  ambientLight(100, 100, 100);
  fill(130, 69, 4);
  noStroke();
  angle = slider.value();
  rotateY(frameCount*0.01);
  translate(0,height/2,0);
  baum(height / 2, 0);
}

function baum(h, g) {
  translate(0,-h/2,0);
  cylinder(20,h);
  if (g >= gen) {
    return;
  }
  translate(0,-h/2,0);
  
  push();
  rotateZ(angle);
  baum(h*0.67,g+1);
  pop();

  push();
  rotateZ(-angle);
  baum(h*0.67,g+1);
  pop();

  push();
  rotateY(PI/2);
  rotateZ(-angle);
  baum(h*0.67,g+1);
  pop();

}