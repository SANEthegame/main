

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "blm_images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "blm_images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "blm_images/cop.png";

var copScenario = ["blm_images/cop_p1.png", "blm_images/cop_p2.png", 
					"blm_images/cop_choose.png",
					"blm_images/cop_1.png", "blm_images/cop_1cont.png",
					"blm_images/cop_2.png", 
					"blm_images/cop_3.png", "blm_images/cop_3cont.png", "blm_images/cop_3cont2.png", 
					""];
					
// Textbox popup
var i = 0;
var textReady = false;
var textImage = new Image();
textImage.onload = function () {
	textReady = false;
};
textImage.src = copScenario[i];



// Game objects
var hero = {
	speed: 200 // movement in pixels per second
};
var monster = {};
var score = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// when the spacebar is pressed, the next dialogue box appears
addEventListener("keydown", function (e) {
	if (e.keyCode == 32){
		if ((e.keyCode == 32) && (i == 2)){
			i = 1;
		}

		if ((e.keyCode == 32) && (i == 4)){
			i = copScenario.lastIndex;
			score++;
		}
		if ((e.keyCode == 32) && (i == 5)){
			i = copScenario.lastIndex;
			score -= 2;
		
		}
		if ((e.keyCode == 32) && (i == 8)){
			i = copScenario.lastIndex;
			score += 3;
			
		}
		
		i++;
	}
}, false);

// when a number key is pressed, it takes you to one dialogue scenario
addEventListener("keydown", function (e) {
	if (e.keyCode == 49){ //1 
		i = 3;
		textReady = true;

	}
}, false);

addEventListener("keydown", function (e) {
	if (e.keyCode == 50){ //2 
		i = 5;
		textReady = true;

	}
}, false);

addEventListener("keydown", function (e) {
	if (e.keyCode == 51){ //3 
		i = 6;
		textReady = true;

	}
}, false);

document.getElementById("game").onclick = function() {
  disableScroll();

};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  	document.onkeydown  = preventDefaultForScrollKeys;
}


// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = Math.floor(125 + Math.random() * 340)
};


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		
		textReady = true;
		}
	
	//player goes off screen
	if ((hero.x >= (canvas.width + 32)) || (hero.x <= (canvas.width - 32))
		|| (hero.y >= (canvas.height + 32)) || (hero.y <= (canvas.height - 32))
	) {
		
		};	
		
	//scenario list
	if (i < copScenario.length){
	textImage.src = copScenario[i];
	}
	else {
		textReady = false;
	}
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (textReady) {
		ctx.drawImage(textImage, 0, 0);
	}

	// Score
	ctx.fillStyle = "rgb(250, 5, 5)";
	ctx.font = "18px Consolas";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Social Justice Score: " + score, 270, 460);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);


};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();