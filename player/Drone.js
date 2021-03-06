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
      rect(0 + 22, 0 + 5, random(10, 40), 7, 10);
      rect(0 + 78, 0 + 5, random(10, 40), 7, 10);
    } else {
      rect(0 + 22, 0 + 5, 50, 7, 10);
      rect(0 + 78, 0 + 5, 50, 7, 10);
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
    this.vel += 3;
    return this.dropped();
  }

  hitBox(box) {
    if (this.pos.x + droneImg.width / 2 > box.pos.x && this.pos.x - droneImg.width < box.pos.x) {
      if (this.pos.y + droneImg.height > box.pos.y && this.pos.y < box.pos.y + boxImg.height) {
        this.crashed = true;
        return true;
      }
    } else {
      return false;
    }
  }

  hitBird(bird) {
    if (this.pos.x + droneImg.width / 2 > bird.pos.x && this.pos.x - droneImg.width < bird.pos.x) {
      if (this.pos.y + droneImg.height / 2 > bird.pos.y && this.pos.y < bird.pos.y + birdImg_1.height) {
        this.crashed = true;
        return true;
      }
    } else {
      return false;
    }
  }

  hitCoin(coin) {
    // var d = dist(this.pos.x, this.pos.y, coin.pos.x, coin.pos.y);
    // if (d < this.r + coin.r / 2) {
    //   return true;
    // }
    if (this.pos.x + droneImg.width / 2 > coin.pos.x && this.pos.x - droneImg.width < coin.pos.x + coin.r) {
      if (this.pos.y + droneImg.height > coin.pos.y && this.pos.y < coin.pos.y + coin.r) {
        return true;
      }
    }
  }

  topEdge() {
    if (this.pos.y < 0) {
      this.crashed = true;
      bsound.stop();
      return this.crashed;
    }
  }
}