class Drone {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(width / 4, height / 4);
    this.vel = 0;
    this.gravity = 0.2;
    this.step = 3;
    this.up = false;
    this.crashed = false;
  }

  show() {
    push();
    let angle = 0;
    if (this.crashed) {
      angle = -25;
    } else {
      angle = 0;
    }
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    rectMode(CENTER);
    image(droneImg, 0, 0);
    pop();
  }

  floating() {
    this.vel += this.gravity;
    this.pos.y += this.vel;
  }

  fly() {
    if (this.up) {
      this.vel = -this.step;
    }
  }

  dropped() {
    if (this.pos.y > height) {
      return true;
    }
  }

  fallingDown() {
    this.crashed = true;
    if (this.pos.x > height + droneImg.height) {
      this.reset();
    }
  }

  hitBox(box) {
    if (this.pos.x + droneImg.width / 2 > box.pos.x && this.pos.x - droneImg.width < box.pos.x) {
      if (this.pos.y + droneImg.height > box.pos.y && this.pos.y < box.pos.y) {
        this.crashed = true;
        return true;
      }
    } else {
      return false;
    }
  }
}