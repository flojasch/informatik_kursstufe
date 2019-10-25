let slider;
let angle;

function setup() {
  createCanvas(500, 500);
  slider=createSlider(0,PI,PI/2,0.01);
  stroke(0);
}

function draw(){ 
  background(200);
  angle=slider.value();
  translate(width/2,height);
  branch(100);
}

function branch(len){
  if(len<4) return;
  line(0,0,0,-len);
  translate(0,-len);
  push();
  rotate(angle);
  branch(len*0.7);
  pop();
  rotate(-angle);
  branch(len*0.7);
}