let slider;
let alpha;
let gen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  alphaslider=createSlider(-PI/4,PI/4,0.04,0.01);
  alphaslider.position(50,100);
  gen=0;
}

function mousePressed(){
  gen++;
}

function draw(){ 
  alpha=alphaslider.value();
  background(230);
  translate(width/2,height);
  fern(height,1,0);
}

function fern(breite,f,g){
  stroke(255+f*(-255),f*255,0);
  strokeWeight(2);
  line(0,0,0,-0.14*breite);
  if(g>=gen||breite<4){
    return;
  } 

  
  translate(0,-0.14*breite);
  
  push()
  rotate(alpha);
  fern(breite*0.86,f*0.93,g+1);
  pop();

  push();
  rotate(PI/4);
  scale(-1,1);
  fern(breite*0.3,f,g+1);
  pop();
  
  push();
  rotate(-PI/4);
  fern(breite*0.3,f,g+1);
  pop();

}