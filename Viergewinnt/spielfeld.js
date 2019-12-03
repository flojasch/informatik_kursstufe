class Spielfeld {
  constructor(array, firstPlayer) {
    this.array = array;
    this.firstPlayer = firstPlayer;
  }

  copy() {
    return new Spielfeld(this.array, this.firstPlayer);
  }

  value() {
    let s = 0;
    let a = this.array;
    // horizontal
    for (let k = 0; k < 6; k++){ // Ebene
      for (let j = 0; j < 5 ; j++){ //wo in der Ebene
        s = 0 ; // das s muss resettet werden
        for (let i = j; i < j + 4; i++){
          s += a[k][i];
        }
        if (abs(s) == 4){
          return abs(s)/s;
        }
      }
    }
    // vertikal
    for (let k = 0; k < 3; k++){ // Ebene
      for (let j = 0; j < 7 ; j++){ //wo in der Ebene
        s = 0 ; // das s muss resettet werden
        for (let i = k; i < k + 4; i++){
          s += a[i][j];
        }
        if (abs(s) == 4){
          return abs(s)/s;
        }
      }
    }
    // schräg nach rechts oben
    for (let k = 0; k < 3; k++){ // Ebene
      for (let j = 0; j < 5 ; j++){ //wo in der Ebene
        s = 0 ; // das s muss resettet werden
        for (let i = j; i < k + 4; i++){
          s += a[k + i][j+ i];
        }
        if (abs(s) == 4){
          return abs(s)/s;
        }
      }
    }
    // schräg nach rechts unten
    for (let k = 6; k  > 2; k--){ // Ebene
      for (let j = 0; j < 5 ; j++){ //wo in der Ebene
        s = 0 ; // das s muss resettet werden
        for (let i = j; i < j + 4; i++){
          s += a[k - i][j+ i];
        }
        if (abs(s) == 4){
          return abs(s)/s;
        }
      }
    }
    return 0;
  }

  print(){
    let string = '\n'
    for(let row of this.array){
      string += row + '\n'
    }
    return string
  }
  nextFields() {
    let nextFields = [];
    

    return nextFields;
  }

}