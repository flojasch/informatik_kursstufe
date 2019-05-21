class Planet {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }
  show() {
    push();
    translate(-this.x, -this.y, -this.z);
    translate(0, 0, playerpos);
    rotateY(millis() / 1000);
    texture(earthimg);
    noStroke();
    sphere(this.r);
    pop();
  }
}

class Projectile {
  constructor(x, y, z, xAngle, yAngle,id) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pos = createVector(x, y, z);
    this.v = 20;
    this.xAngle = xAngle;
    this.yAngle = yAngle;
    this.id=id;
    for(let i=0;i<4;i++){
      this.update();
    }
  }
  show() {
    push();
    translate(-this.x, -this.y, -this.z);
    translate(0, 0, playerpos);
    rotateY(-this.yAngle);
    rotateX(-this.xAngle);
    rotateX(PI / 2);
    noStroke();
    fill(color('magenta'));
    cylinder(10, 80);
    pop();
  }
  update() {
    this.x += this.v * Math.sin(-this.yAngle) * Math.cos(this.xAngle);
    this.y += this.v * Math.sin(this.xAngle);
    this.z += this.v * Math.cos(this.yAngle) * Math.cos(this.xAngle);
  }
  hit(o) {
    let dx = this.x - o.x;
    let dy = this.y - o.y;
    let dz = this.z - o.z;
    let dist = dx * dx + dy * dy + dz * dz;
    return dist < 40 * 40;
  }
}

class Explosion {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.time = 0;
    this.size = 10;
  }
  show() {
    push();
    translate(-this.x, -this.y, -this.z);
    translate(0, 0, playerpos);
    noStroke();
    texture(expimg);
    sphere(this.size);
    pop();
  }
  update() {
    this.time += 0.2;
    let t = (this.time - 5) * 0.5;
    this.size = exp(-t * t) * 50;
  }

}