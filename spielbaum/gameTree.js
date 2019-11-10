class GameTree {
  constructor(feld) {
    this.children = [];
    this.value = feld.value();
    this.feld=feld;
  }

  isTerminal() {
    return this.children.length == 0;
  }

  maxPlayer(alpha, beta) {
    if (this.isTerminal()) {
      return heuristic(this.feld);
    }
    for (let child of this.children) {
      alpha = max(alpha, child.minPlayer(alpha, beta));
      if (alpha >= beta) {
        break;
      }
    }
    return alpha;
  }

  minPlayer(alpha, beta) {
    if (this.isTerminal()) {
      return heuristic(this.feld);
    }
    for (let child of this.children) {
      beta = min(beta, child.maxPlayer(alpha, beta));
      if (alpha >= beta) {
        break;
      }
    }
    return beta;
  }

  grow() {
    if (this.value !== 0) {
      return;
    }
    if (this.isTerminal()) {
      let nextFields = this.feld.nextFields();
      for (let field of nextFields) {
        let tree = new GameTree(field);
        this.children.push(tree);
      }
    } else {
      for (let child of this.children) {
        child.grow();
      }
    }
  }

  makeTurn(zugtiefe) {
    for(let i=0;i<zugtiefe;i++){
      this.grow();
    }
    let res;
    let opt = -1;
    for (let child of this.children) {
      let val = child.minPlayer(-1, 1);
      if (val > opt) {
        opt = val;
        res = child.feld.copy();
      }
    }
    console.log(opt);
    return res;
  }

}