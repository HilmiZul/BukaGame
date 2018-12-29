let boxes = [];
let boxImg;
let bgImg;
let bg = [];
let totalBg = 2;
let droneImg;
let drone;
let birds = [];

let stack, totalBox;

function preload() {
	bgImg = loadImage("assets/img/bg-transparent.png");
	boxImg = loadImage("assets/img/box3d.png");
	droneImg = loadImage("assets/img/kurir.png");
	birdImg_1 = loadImage("assets/img/bird-a.png");
	birdImg_2 = loadImage("assets/img/bird-b.png");
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
	layerDrone = 'a';

	for (let i = 0; i < 1; i++) {
		birds.push(new Bird());
	}
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

	// BIRDS
	for (let i = 0; i < birds.length; i++) {
		birds[i].show();
		birds[i].update();
		if (birds[i].checkEdge()) {
			birds.splice(i, 1);
			birds.push(new Bird());
		}
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