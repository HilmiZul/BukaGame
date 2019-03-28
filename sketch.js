let boxesBottom = [];
let boxesTop = [];
let boxImg;
let bgImg;
let bg = [];
let totalBg = 2;
let droneImg;
let drone;
let bird;
let stack, totalBox;
let travel;
let font;
let bsound;
let gameoverSound;
let gameendSound;
let pause = false;
let play = true;

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
	gameoverSound = loadSound("assets/sound/gameover.mp3");
	gameendSound = loadSound("assets/sound/gameend.mp3");
}

function randTotalBox() {
	return random(1, 6);
}

function speedUp(droneArr) {
	if (travel > 100 && travel < 100) {
		droneArr.step = 2.5;
	} else if (travel > 200 && travel < 300) {
		droneArr.step = 3;
	} else if (travel > 300 && travel < 400) {
		droneArr.step = 3.5;
	} else if (travel > 400 && travel < 500) {
		droneArr.step = 4;
	} else if (travel > 500 && travel < 600) {
		droneArr.step = 4.5;
	} else if (travel > 600 && travel < 999) {
		droneArr.step = 5;
	}
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

	// DRONE: new Object
	drone = new Drone();

	// BIRD
	bird = new Bird();

	// initialize travel distance
	travel = 0;
}

function draw() {
	if (play) {
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
				if (drone.fallingDown()) {
					play = false;
				}
			}
			// SPEED UP WHEN TRAVEL > 100
			speedUp(boxesBottom[j]);
		}
		// tampilkan box atas
		for (let k = 0; k < boxesTop.length; k++) {
			boxesTop[k].show();
			boxesTop[k].update();
			if (drone.hitBox(boxesTop[k])) {
				if (drone.fallingDown()) {
					play = false;
				}
			}
			// SPEED UP WHEN TRAVEL > 100
			speedUp(boxesTop[k]);
		}

		// CHECK FOR CREATE NEW BOX
		if (frameCount % 190 == 1) {
			stack = 0;
			totalBox = randTotalBox();
			for (let j = 0; j < totalBox; j++) {
				boxesBottom.push(new Boxes(width, height - boxImg.height - stack + 100));
				stack += boxImg.height;
			}

			// ALSO, create new box atas :D
			stackTop = 0;
			totalBoxTop = (10 - totalBox) - random(2, 3);
			for (let k = 0; k < totalBoxTop; k++) {
				boxesTop.push(new Boxes(width, 0 + (boxImg.height + stackTop) - 100));
				stackTop += boxImg.height;
			}
		}


		// BIRD
		if (travel > 100 && travel < 200) {
			bird.show();
			bird.update();
			if (bird.checkEdge()) {
				bird.reset();
			}
			if (drone.hitBird(bird)) {
				if (drone.fallingDown()) {
					play = false;
				}
			}
		}

		// DRONE
		drone.show();
		drone.floating();
		drone.fly();
		if (drone.dropped()) {
			drone.reset();
			play = false;
		}
		if (drone.topEdge()) {
			if (drone.fallingDown()) {
				// drone.reset();
				play = false;
			}
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

		if (pause) {
			// GAME PAUSED
			background(0, 150);
			push();
			fill(255);
			stroke(237, 120, 153);
			strokeWeight(20);
			textSize(100);
			textAlign(CENTER);
			text("BENTAR...", width / 2, height / 2);
			textSize(40);
			strokeWeight(10);
			text("Press ENTER", width / 2, height / 2 + 100);
			pop();
			bsound.pause();
		}
	} else {
		// GAME OVER
		// background while transparent
		background(0, 150);

		push();
		fill(255);
		stroke(237, 120, 153);
		strokeWeight(20);
		textAlign(CENTER);
		textSize(70);
		text("GAME OVER", width / 2, height / 2 - 150);
		text("--------------------", width / 2, height / 2 - 90);
		strokeWeight(10);
		text("Travel: " + travel + " m", width / 2, height / 2);
		textSize(40);
		strokeWeight(10);
		text("Press ENTER", width / 2, height / 2 + 100);
		pop();
		noLoop();
		bsound.stop();
		gameoverSound.play();
		setTimeout(this, 10000);
		gameendSound.loop();
	}
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
		if (!pause) {
			if (play) {
				pause = true;
				noLoop();
			}
		}
	} else if (keyCode == RETURN) {
		if (!play) {
			play = true;
			drone.reset();
			travel = 0;
			boxesBottom = []; // kosongkan array
			boxesTop = []; // kosongkan array
			bird.reset();
			bsound.loop();
			gameendSound.stop();
			loop();
		}
		if (pause) {
			pause = false;
			loop();
			bsound.play();
		}
	}
}

function keyReleased() {
	drone.up = false;
}