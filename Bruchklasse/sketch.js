let bruch;
let counter = 0;

function setup() {
  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(getbruch);

  text = createElement('h2', 'Gib einen Bruch ein!');
  text.position(20, 5);
}

function getbruch() {
  // let text = document.getElementById("text");
  // let str = document.getElementById("bruch").value;
  let str = input.value();
  if (counter == 0) {
    bruch = new Bruch(str);
    text.html("gib noch einen Bruch ein!");
    // text.innerHTML = "gib noch einen Bruch ein!";
    ++counter;
  } else {
    let bruch2 = new Bruch(str);
    let erg = Bruch.add(bruch, bruch2);
    text.html('Summe: ' + erg.print());
    // text.innerHTML = 'Summe: ' + erg.print();
    counter = 0;
  }
}

class Bruch {
  constructor(str) {
    let pos = str.search("/");
    this.n = Number(str.slice(pos + 1, str.length));
    this.z = Number(str.slice(0, pos));
    this.kuerze();
  }
  static add(b1, b2) {
    let z = b1.z * b2.n + b2.z * b1.n;
    let n = b1.n * b2.n;
    return new Bruch(z + '/' + n);
  }

  kuerze() {
    let teiler = this.ggt(this.z, this.n);
    this.z /= teiler;
    this.n /= teiler;
  }
  add(b) {
    this.z = this.z * b.n + b.z * this.n;
    this.n = this.n * b.n;
    this.kuerze();
  }

  mult(b) {
    this.n *= b.n;
    this.z *= b.z;
  }

  ggt(a, b) {
    while (a != b) {
      if (a > b) {
        a = a - b;
      } else {
        b = b - a;
      }
    }
    return a;
  }
  print() {
    return this.z + '/' + this.n;
  }

}
