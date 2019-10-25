let faktor;
let slider;
let alphaslider;
let alpha;

function setup() {
  createCanvas(windowHeight, windowHeight);
  slider=createSlider(5,40,10,1);
  alphaslider=createSlider(0,PI/2,PI/4,0.01);
}

function draw(){ 
  faktor=slider.value();
  alpha=alphaslider.value();
  background(100);
  translate(0,height);
  sierpinsky(width,0,0,0);
}

function sierpinsky(breite,r,g,b){
  if(breite<1){
    stroke(r,g,b);
    point(0,0);
    return;
  } 
  sierpinsky(breite*0.5,r+faktor,g,b);
  push();
  translate(breite*0.5,0);
  sierpinsky(breite*0.5,r,g+faktor,b);
  pop();
  push();
  translate(breite/4,-breite/2);
  rotate(alpha);
  sierpinsky(breite*0.5,r,g,b+faktor);
  pop();

}