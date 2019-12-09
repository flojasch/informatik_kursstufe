let array = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]
  
function setup() {
  createCanvas(800, 800);
  background(200);
  feld = new Spielfeld(array, true);
  tree = new GameTree(feld);
  feld = tree.makeTurn(7);
}

function mousePressed() {
  feld.putcoin(floor(mouseX / 100));
  tree = new GameTree(feld);
  feld = tree.makeTurn(7);
}

function draw() {
  background(200);
  feld.draw();
}