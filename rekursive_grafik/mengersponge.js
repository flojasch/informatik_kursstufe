let gen;
let slider;
let angle;

function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  slider = createSlider(0, PI / 4, 0, 0.01);

  gen = 0;
}

function mousePressed() {
  gen++;
}

function draw() {
  background(100);
  directionalLight(250, 0, 0, -1, -1, -0.5);
  ambientLight(100, 0, 0);
  fill(250, 250, 250);
  noStroke();
  angle = slider.value();
  rotateX(PI / 4);
  rotateY(PI / 4);
  menger(width / 2, 0);
}

function menger(r, g) {
  if (g >= gen) {
    box(r);
    return;
  }

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        let sum = abs(i) + abs(j) + abs(k);
        if (sum > 1) {
          push();
          let newr = r / 3;
          translate(i * newr, j * newr, k * newr);
          if (i == 1 && j == 1 && k == 1) {
            rotateX(angle);
            rotateY(angle);
          }
          menger(newr, g + 1);
          pop();
        }
      }
    }
  }
}