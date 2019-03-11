let boxes = [];
let boxImg;
let bgImg;
let bg = [];
let totalBg = 2;
let droneImg;
let drone;
let birds = [];
let stack, totalBox;
let travel;
let font;

function preload() {
	bgImg = loadImage("assets/img/bg-transparent.png");
	boxImg = loadImage("assets/img/box3d.png");
	// boxImg2 = loadImage("assets/img/box3d2.png");
	droneImg = loadImage("assets/img/kurir.png");
	birdImg_1 = loadImage("assets/img/bird-a.png");
	birdImg_2 = loadImage("assets/img/bird-b.png");
	travelImg = loadImage("assets/img/travel.png");
	font = loadFont("assets/font/FredokaOne.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// BACKGROUND
	let posX = 0;
	for (let i = 0; i < totalBg; i++) {
		bg.push(new Background(posX));
		posX += bgImg.width;
	}

	// DRONE: new Object
	drone = new Drone();

	for (let i = 0; i < 1; i++) {
		birds.push(new Bird());
	}

	// initialize travel distance
	travel = 0;
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

	// BIRDS
	for (let i = 0; i < birds.length; i++) {
		birds[i].show();
		birds[i].update();
		if (birds[i].checkEdge()) {
			birds.splice(i, 1);
			birds.push(new Bird());
		}

		if (drone.hitBird(birds[i])) {
			drone.fallingDown();
		}
	}

	// DRONE
	drone.show();
	drone.floating();
	drone.fly();
	if (drone.dropped()) {
		drone.reset();
		travel = 0;
	}

	// TRAVEL IN METER (m)
	if (frameCount % 30 == 0) {
		travel++;
	}
	image(travelImg, 10, 10);
	fill(237, 120, 153);
	stroke(255);
	strokeWeight(7);
	textSize(40);
	textFont(font);
	text(travel, 60, 50);
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