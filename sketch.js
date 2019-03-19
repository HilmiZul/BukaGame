let boxesBottom = [];
let boxesTop = [];
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
let bsound;

function preload() {
	bgImg = loadImage("assets/img/bg-transparent.png");
	boxImg = loadImage("assets/img/box-2.png");
	// boxImg2 = loadImage("assets/img/box3d2.png");
	droneImg = loadImage("assets/img/drone.png");
	birdImg_1 = loadImage("assets/img/bird-a.png");
	birdImg_2 = loadImage("assets/img/bird-b.png");
	travelImg = loadImage("assets/img/travel.png");
	font = loadFont("assets/font/FredokaOne.ttf");
	bsound = loadSound("assets/sound/bsound.wav");
}

function randTotalBox() {
	return random(0, 5);
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// latar musik :D
	bsound.loop();

	// BACKGROUND
	let posX = 0;
	for (let i = 0; i < totalBg; i++) {
		bg.push(new Background(posX));
		posX += bgImg.width;
	}

	// BOX
	// box bawah
	stack = 0;
	totalBox = randTotalBox();
	for (let j = 0; j < totalBox; j++) {
		boxesBottom.push(new Boxes(width, height - boxImg.height - stack + 100));
		stack += boxImg.height;
	}
	// box atas
	stackTop = 0;
	totalBoxTop = (10 - totalBox) - 3;
	for (let k = 0; k < totalBoxTop; k++) {
		boxesTop.push(new Boxes(width, 0 + (boxImg.height + stackTop) - 100));
		stackTop += boxImg.height;
	}


	// DRONE: new Object
	drone = new Drone();

	// BIRD
	for (let i = 0; i < 1; i++) {
		birds.push(new Bird());
	}

	// initialize travel distance
	travel = 0;
}

function draw() {
	background(255, 242, 242);

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
	// tampilkan box bawah
	for (let j = 0; j < boxesBottom.length; j++) {
		boxesBottom[j].show();
		boxesBottom[j].update();
		if (drone.hitBox(boxesBottom[j])) {
			drone.fallingDown();
		}
		if (boxesBottom[j].checkEdge()) {
			// kosongkan dan buat baru
			boxesBottom = [];
			boxesTop = [];

			// create new box bawah
			stack = 0;
			totalBox = randTotalBox();
			for (let j = 0; j < totalBox; j++) {
				boxesBottom.push(new Boxes(width, height - boxImg.height - stack + 100));
				stack += boxImg.height;
			}

			// ALSO, create new box atas :D
			stackTop = 0;
			totalBoxTop = (10 - totalBox) - 3;
			for (let k = 0; k < totalBoxTop; k++) {
				boxesTop.push(new Boxes(width, 0 + (boxImg.height + stackTop) - 100));
				stackTop += boxImg.height;
			}
		}
	}
	// tampilkan box atas
	for (let k = 0; k < boxesTop.length; k++) {
		boxesTop[k].show();
		boxesTop[k].update();
		if (drone.hitBox(boxesTop[k])) {
			drone.fallingDown();
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
	if (drone.topEdge()) {
		drone.fallingDown();
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

	// PAUSE AND PLAY
	// (TEMPORARY)
	if (keyCode == ESCAPE) {
		noLoop();
	} else if (keyCode == RETURN) {
		loop();
	}
}

function keyReleased() {
	drone.up = false;
}