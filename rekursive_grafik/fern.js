let slider;
let alpha;
let maxgen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  alphaslider=createSlider(-PI/4,PI/4,0.04,0.01);
  alphaslider.position(50,100);
  maxgen=0;
}

function mousePressed(){
  maxgen++;
}

function draw(){ 
  alpha=alphaslider.value();
  background(230);
  translate(width/2,height);
  fern(height,0,0,0,0);
}

function fern(breite,gen,r,g,b){
  stroke(r,g,b);
  strokeWeight(2);
  line(0,0,0,-0.14*breite);
  if(gen>=maxgen||breite<4){
    return;
  } 

  gen++;
  let inkr=255/pow(2,gen);
  translate(0,-0.14*breite);
  
  push()
  rotate(alpha);
  fern(breite*0.86,gen,r,g+inkr,b);
  pop();

  push();
  rotate(PI/4);
  scale(-1,1);
  fern(breite*0.3,gen,r+inkr,g,b);
  pop();
  
  push();
  rotate(-PI/4);
  fern(breite*0.3,gen,r+inkr,g,b);
  pop();

}