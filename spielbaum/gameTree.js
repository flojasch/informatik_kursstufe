class GameTree {
  constructor(feld) {
    this.children = [];
    this.value = feld.value();
    this.feld = feld;
  }

  isTerminal() {
    return this.children.length == 0;
  }

  maxPlayer() {
    if (this.isTerminal()) {
      return this.value;
    }
    let opt = -1;
    for (let child of this.children) {
      let val = child.minPlayer();
      if (val >= opt) {
        opt = val;
      }
    }
    return opt;
  }

  minPlayer() {
    if (this.isTerminal()) {
      return this.value;
    }
    let opt = 1;
    for (let child of this.children) {
      let val = child.minPlayer();
      if (val <= opt) {
        opt = val;
      }
    }
    return opt;
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

  makeTurn(zugtiefe){
    //hier musst du zunächst den Spielbaum "zugtiefe" mal wachsen lassen


    //jetzt noch über die minPlayer() Methode den optimalen Zug auswählen


    // am Ende noch das Spielfeld des optimalen Zugs zurückgeben

  }

}