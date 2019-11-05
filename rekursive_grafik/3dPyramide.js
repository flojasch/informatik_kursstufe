let m;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  m = sqrt(3) / 2;
  h = sqrt(6) / 3;
}

function draw() {
  background(0);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(60, 60, 60);
  directionalLight(255, 255, 255, -1, -1,-0.5 );
  // directionalLight(-1,-1,-1);
  //rotateX(PI / 4);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.01);
  fill(250, 0, 0);
  pyramide(300);

}

function pyramide(r) {
  if (r < 20) {
    beginShape();
    vertex(0, 0, 0);
    vertex(r, 0, 0);
    vertex(r / 2, r * m, 0);
    endShape(CLOSE);

    beginShape();
    vertex(0, 0, 0);
    vertex(r / 2, m / 3 * r, h * r);
    vertex(r / 2, r * m, 0);
    endShape(CLOSE);

    beginShape();
    vertex(r, 0, 0);
    vertex(r / 2, m / 3 * r, h * r);
    vertex(r / 2, r * m, 0);
    endShape(CLOSE);

    beginShape();
    vertex(0, 0, 0);
    vertex(r / 2, m / 3 * r, h * r);
    vertex(r, 0, 0);
    endShape(CLOSE);
    return;
  }
  r = 0.5 * r;
  pyramide(r);
  push();
  translate(r, 0, 0);
  pyramide(r);
  pop();
  push();
  translate(0.5 * r, m * r, 0);
  pyramide(r);
  pop();
  push();
  translate(0.5 * r, r * m / 3, r * h);
  pyramide(r);
  pop();
}