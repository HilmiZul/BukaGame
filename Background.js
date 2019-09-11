class Background {
  constructor(posX) {
    this.pos = createVector(0 + posX, height - bgImg.height);
    this.step = 0.6;
  }

  show() {
    image(bgImg, this.pos.x, this.pos.y);
  }

  move() {
    this.pos.x -= this.step;
  }

  edge() {
    if (this.pos.x < 0 - bgImg.width) {
      return true;
    } else {
      return false;
    }
  }
}