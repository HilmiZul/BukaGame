class Coin {
  constructor(x, y) {
    this.reset(x, y);
  }

  reset(x, y) {
    this.pos = createVector(x, y);
    this.r = 40;
  }

  show() {
    fill(253, 253, 150);
    strokeWeight(3);
    ellipse(this.pos.x + this.r, this.pos.y, this.r, this.r + 10);
  }

  update(step) {
    this.pos.x -= step;
  }
}