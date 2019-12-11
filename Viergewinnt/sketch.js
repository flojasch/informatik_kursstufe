function cp(array) {
  let ret = [];
  for (let i = 0; i < array.length; i++) {
    ret[i] = [];
    for (let j = 0; j < array[i].length; j++) {
      ret[i][j] = array[i][j];
    }
  }
  return ret;
}

let array = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function setup() {
  createCanvas(800, 800);
  background(200);
  feld = new Spielfeld(array, true);
  tree = new GameTree(feld);
  feld = tree.makeTurn(6);
}

function mousePressed() {
  feld.putcoin(floor(mouseX / 100));
  tree = new GameTree(feld);
  feld = tree.makeTurn(6);
}

function draw() {
  background(200);
  feld.draw();
}
