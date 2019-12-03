
let feld=new Spielfeld(5,true);
let tree=new GameTree(feld);
feld=tree.makeTurn(6);
console.log(feld);

function myTurn(bricknumber){
  feld=new Spielfeld(bricknumber,true);
  tree=new GameTree(feld);
  feld=tree.makeTurn(6);
  console.log(feld);
}