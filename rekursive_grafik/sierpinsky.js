let alphaslider;
let alpha;
let maxgen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider=createSlider(0,PI/2,0,0.01);
  slider.position(50,50);
  maxgen=0;
}

function mousePressed(){
  ++maxgen;
}

function draw(){ 
  alpha=slider.value();
  background(250);
  translate(0,height);
  sierpinsky(height,0,0,0,0);
}

function sierpinsky(breite,gen,r,g,b){
  if(gen>=maxgen){
    //stroke(r,g,b);
    //point(0,0);
    noStroke();
    fill(r,g,b);
    triangle(0,0,breite/2,-breite,breite,0);
    return;
  } 
  gen++;
  sierpinsky(breite*0.5,gen,r+255/pow(2,gen),g,b);
  push();
  translate(breite*0.5,0);
  sierpinsky(breite*0.5,gen,r,g+255/pow(2,gen),b);
  pop();
  push();
  translate(breite/4,-breite/2);
  rotate(alpha);
  sierpinsky(breite*0.5,gen,r,g,b+255/pow(2,gen));
  pop();
}