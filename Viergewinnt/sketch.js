let array = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]
let feld = new Spielfeld(array, true);
  
function setup() {
  let tree = new GameTree(feld);
  // feld = tree.makeTurn(6);
  alert(feld.print());
}

function myTurn(slot) {
  feld.putcoin(slot); //diese Methode muss noch in der Spielfeldklasse erstellt werden
  tree = new GameTree(feld);
  feld = tree.makeTurn(6);
  alert(feld);
}