let faktor;
let slider;
let alphaslider;
let alpha;

function setup() {
  createCanvas(windowHeight, windowHeight);
  slider=createSlider(5,40,10,1);
  alphaslider=createSlider(-PI/4,PI/4,0,0.01);
}

function draw(){ 
  faktor=slider.value();
  alpha=alphaslider.value();
  background(100);
  translate(width/2,height);
  fern(width,0,0,0);
}

function fern(breite,r,g,b){
  if(breite<2){
    stroke(r,g,b);
    point(0,0);
    return;
  } 
  stroke(r,g,b);
  line(0,0,0,-0.15*breite);
  translate(0,-0.15*breite);
  
  push()
  rotate(alpha);
  fern(breite*0.86,r+faktor,g,b);
  pop();

  push();
  rotate(PI/4);
  fern(breite*0.3,r,g+faktor,b+faktor);
  pop();
  
  push();
  rotate(-PI/4);
  fern(breite*0.3,r,g+faktor,b+faktor);
  pop();

}