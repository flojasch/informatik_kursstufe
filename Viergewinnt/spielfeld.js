class Spielfeld {
  constructor(array, firstPlayer) {
    this.array = cp(array);
    this.firstPlayer = firstPlayer;
  }

  copy() {
    return new Spielfeld(this.array, this.firstPlayer);
  }

  value() {
    let s = 0;
    let a = this.array;
    // horizontal
    for (let k = 0; k < 6; k++) { // Ebene
      for (let j = 0; j < 4; j++) { //wo in der Ebene
        s = 0; // das s muss resettet werden
        for (let i = 0; i < 4; i++) {
          s += a[k][j + i];
        }
        if (abs(s) == 4) {
          return s / 4;
        }
      }
    }
    // vertikal
    for (let j = 0; j < 7; j++) { // Spalte
      for (let k = 0; k < 3; k++) { //wo in der Spalte
        s = 0; // das s muss resettet werden
        for (let i = 0; i < 4; i++) {
          s += a[k + i][j];
        }
        if (abs(s) == 4) {
          return s / 4;
        }
      }
    }
    // schräg nach rechts oben
    for (let k = 0; k < 3; k++) { // Start-höhe
      for (let j = 0; j < 4; j++) { // Start-Spalte
        s = 0; // das s muss resettet werden
        for (let i = 0; i < 4; i++) {
          s += a[k + i][j + i];
        }
        if (abs(s) == 4) {
          return s / 4;
        }
      }
    }
    // schräg von links oben
    for (let k = 5; k > 2; k--) { // Starthöhe
      for (let j = 0; j < 4; j++) { //Startspalte
        s = 0; // das s muss resettet werden
        for (let i = 0; i < 4; i++) {
          s += a[k - i][j + i];
        }
        if (abs(s) == 4) {
          return s / 4;
        }
      }
    }
    return 0;
  }
  draw() {
    fill(0, 0, 200);
    rect(0, 200, 700, 600);
    for (let i = 0; i < 7; ++i) {
      for (let j = 0; j < 6; ++j) {
        if (this.array[j][i] == 1) {
          fill(200, 0, 0);
        }
        if (this.array[j][i] == -1) {
          fill(250, 250, 0);
        }
        if (this.array[j][i] === 0) {
          fill(255);
        }
        ellipse(50 + i * 100, 750 - j * 100, 90, 90);
      }
    }
  }

  nextFields() {
    let nextFields = [];
    for (let slot = 0; slot < 7; slot++) {
      if (this.array[5][slot] == 0) {
        let next = new Spielfeld(this.array, this.firstPlayer);
        next.putcoin(slot);
        nextFields.push(next);
      }
    }
    return nextFields;
  }

  putcoin(slot) {
    let row = 5;
    while (row >= 0 && this.array[row][slot] == 0) {
      row--;
    }
    if (this.firstPlayer) {
      this.array[row + 1][slot] = 1;
    } else {
      this.array[row + 1][slot] = -1;
    }
    this.firstPlayer = !this.firstPlayer;
  }

}