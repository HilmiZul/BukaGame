class Bird {
  constructor() {
    this.pos = createVector(random(width + 500, width + 900), random(0, height / 2));
    this.vel = random(4, 8);
  }

  show() {
    let index = random(1, 2);
    index = Math.round(index);
    if (index == '1') {
      image(birdImg_1, this.pos.x, this.pos.y);
    } else {
      image(birdImg_2, this.pos.x, this.pos.y);
    }
  }

  update() {
    this.pos.x -= this.vel;
  }

  checkEdge() {
    if (this.pos.x < 0 - birdImg_1.width) {
      return true;
    } else {
      return false;
    }
  }
}