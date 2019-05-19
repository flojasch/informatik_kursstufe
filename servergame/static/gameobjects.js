class Planet {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }
  show() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(millis() / 1000);
    texture(earthimg);
    noStroke();
    sphere(this.r);
    pop();
  }
}

class Projectile {
  constructor(x, y, z, xAngle, yAngle) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.v = 20;
    this.xAngle = xAngle;
    this.yAngle = yAngle;
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
    cylinder(20, 200);
    pop();
  }
  update() {
    this.x += this.v * Math.sin(-this.yAngle) * Math.cos(this.xAngle);
    this.y += this.v * Math.sin(this.xAngle);
    this.z += this.v * Math.cos(this.yAngle) * Math.cos(this.xAngle);
  }
  hit(obj) {
    let dist = this.pos.dist(obj.pos);
    // console.log(dist);
    return dist < obj.size;
  }
}

class Explosion {
  constructor(pos) {
    this.pos = pos;
    this.time = 0;
    this.size = 200;
    this.img = expimg;
    this.speed = 30;
  }
  show() {
    push();
    translate(this.pos);
    noStroke();
    texture(this.img);
    sphere(this.size);
    pop();
  }
  update() {
    this.pos.sub(createVector(-this.speed * sin(xAngle) * sin(angle), this.speed * sin(xAngle) * cos(angle), -this.speed * cos(xAngle)));
    this.time += 1;
    let t = (this.time - 5) * 0.5;
    this.size = exp(-t * t) * 200;
  }

}