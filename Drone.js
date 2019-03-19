class Drone {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = createVector(width / 5, height / 4);
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

    // body
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    image(droneImg, 0, 0);

    // propeller
    fill(102, 121, 143);
    noStroke();
    rectMode(CENTER);
    if (!this.crashed) {
      rect(0 + 22, 0 + 5, random(10, 50), 9, 10);
      rect(0 + 78, 0 + 5, random(10, 50), 9, 10);
    } else {
      rect(0 + 22, 0 + 5, 50, 9, 10);
      rect(0 + 78, 0 + 5, 50, 9, 10);
    }
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

  hitBird(bird) {
    if (this.pos.x + droneImg.width / 2 > bird.pos.x && this.pos.x - droneImg.width < bird.pos.x) {
      if (this.pos.y + droneImg.height / 2 > bird.pos.y && this.pos.y < bird.pos.y) {
        this.crashed = true;
        return true;
      }
    } else {
      return false;
    }
  }

  topEdge() {
    if (this.pos.y < 0) {
      this.crashed = true;
      return true;
    }
  }
}