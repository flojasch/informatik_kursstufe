class Spielfeld {
  constructor(bricknumber, firstPlayer) {
    this.bricknumber = bricknumber;
    this.firstPlayer = firstPlayer;
  }

  copy() {
    return new Spielfeld(this.bricknumber,this.firstPlayer);
  }

  value() {
    if (this.bricknumber == 1) {
      if (this.firstPlayer) {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  }

  nextFields() {
    let nextFields = [];
    for (let i of [1, 2]) {
      let bricknumber = this.bricknumber - i;
      if (bricknumber >= 1) {
        nextFields.push(new Spielfeld(bricknumber,!this.firstPlayer));
      }
    }
    return nextFields;
  }

}