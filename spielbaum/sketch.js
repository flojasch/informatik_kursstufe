let tree;

function setup(){
  let feld=new Spielfeld(5,true);
  tree = new GameTree(feld);
  tree.grow();
  tree.grow();
  tree.grow();
  console.log(tree);
}
