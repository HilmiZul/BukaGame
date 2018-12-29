let boxes = [];
let boxImg;
let bgImg;
let bg = [];
let totalBg = 2;
let droneImg;
let drone;

let stack, totalBox;

function preload() {
	bgImg = loadImage("assets/img/bg-transparent.png");
	boxImg = loadImage("assets/img/box3d.png");
	droneImg = loadImage("assets/img/drone.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// BOXES
	stack = 0;
	totalBox = random(0, 5);
	for (let j = 0; j < totalBox; j++) {
		boxes.push(new Boxes(stack));
		stack += boxImg.height;
	}

	// BACKGROUND
	let posX = 0;
	for (let i = 0; i < totalBg; i++) {
		bg.push(new Background(posX));
		posX += bgImg.width;
	}

	// DRONE
	drone = new Drone();
}

function draw() {
	background(234, 242, 255);

	// BACKGROUND PARALLAX :D
	for (let i = 0; i < bg.length; i++) {
		bg[i].show();
		bg[i].move();

		if (bg[i].edge()) {
			bg.splice(i, 1);
			let posX = bgImg.width;
			bg.push(new Background(posX));
		}
	}

	// BOXES
	for (let j = 0; j < boxes.length; j++) {
		boxes[j].show();
		boxes[j].update();
		if (drone.hitBox(boxes[j])) {
			console.log("hit");
			drone.fallingDown();
		}
	}
	if (frameCount % 160 == 1) {
		// reset stack & totalBox :D
		stack = 0;
		totalBox = random(0, 5);
		for (let j = 0; j < totalBox; j++) {
			boxes.push(new Boxes(stack));
			stack += boxImg.height;
		}
	}

	// DRONE
	drone.show();
	drone.floating();
	drone.fly();
	if (drone.dropped()) {
		drone.reset();
	}
}

function keyPressed() {
	if (key == ' ') {
		if (!drone.crashed) {
			drone.up = true;
		}
	}
}

function keyReleased() {
	drone.up = false;
}