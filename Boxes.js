class Boxes {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.step = 2;
    this.total = random(0, 5);
  }

  show() {
    // let stack = 0;
    // for (let i = 0; i < this.total; i++) {
    image(boxImg, this.pos.x, this.pos.y);
    // stack += boxImg.height;
    // }
  }

  update() {
    this.pos.x -= this.step;
  }
}