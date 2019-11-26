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
      return this.value;
    }
    for (let child of this.children) {
      alpha = Math.max(alpha, child.minPlayer(alpha, beta));
      if (alpha >= beta) {
        break;
      }
    }
    return alpha;
  }

  minPlayer(alpha, beta) {
    if (this.isTerminal()) {
      return this.value;
    }
    for (let child of this.children) {
      beta = Math.min(beta, child.maxPlayer(alpha, beta));
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
        let node = new GameTree(field);
        this.children.push(node);
      }
    } else {
      for (let child of this.children) {
        child.grow();
      }
    }
  }

 

}