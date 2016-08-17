//LEVELS
//var scripts = ["js/islam.js", "js/catcall.js"];

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
bgImage.src = "islam_images/islam2.jpg";

// our avatar image 
var avatarReady = false;
var avatarImage = new Image();
avatarImage.onload = function (){
avatarReady= true;
};
avatarImage.src = "islam_images/hero.png";

// hijab girl image
var hijabReady = false;
var hijabImage = new Image();
hijabImage.onload = function () {
	hijabReady = true;
};
hijabImage.src = "islam_images/hijab4.png";

// Mean lady image
var meanReady = false;
var meanImage = new Image();
meanImage.onload = function () {
	meanReady = true;
};
meanImage.src = "islam_images/person.png";

var options= ["islam_images/ev1.png", "islam_images/ev2.png", 
				"islam_images/evchoices.png", "islam_images/evchoice1.png", 
				"islam_images/evchoice2.png", "islam_images/evchoice3.png",""];
	
// Dialogue image
var k = 0;
var dialogueReady = false
var dialogueImage = new Image();
dialogueImage.onload = function () {
	dialogueReady = false;
};
dialogueImage.src = options [i];

// game objects
var avatar = {
	speed: 256 // movement in pixels per second
};
var hijab = {};
var mean = {};
var score = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//when the space bar is pressed, the next dialogue pic appears
addEventListener ("keydown", function(e) {
	if (e.keyCode == 32){
		if ((e.keyCode == 32) && (k== 2)){
			k=1;
		}
		
		if ((e.keyCode == 32) && (k==3)){
			k= options.lastIndex;
			score -= 3;
		}
		if ((e.keyCode == 32) && (k==4)){
			k = options.lastIndex;
			score-=1;
		}
		if ((e.keyCode == 32) && (k==5)){
			k = options.lastIndex;
			score +=3;
		}
		k++;
	}
}, false);
// when a number is pressed the corresponding pic shows
addEventListener("keydown", function (e){
	if (e.keyCode == 49){//1
		k = 3;
		dialogueReady= true; 
	}
}, false);
addEventListener("keydown", function (e){
	if (e.keyCode == 50){//2
		i = 4;
		dialogueReady= true;
	}
}, false);
addEventListener("keydown", function (e){
	if (e.keyCode == 51){//3
		i = 5;
		dialogueReady = true;
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
	avatar.x = canvas.width / 2;
	avatar.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	mean.x = 100;
	mean.y = 360;
};

//var screen = document.getElementById("level")
//function changeScreen() {
//	screen.src = "js/catcall.js";
//}

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		avatar.y -= avatar.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		avatar.y += avatar.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		avatar.x -= avatar.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		avatar.x += avatar.speed * modifier;
	}

	// Are they touching?
	if (
		avatar.x <= (mean.x + 32)
		&& mean.x <= (avatar.x + 32)
		&& avatar.y <= (mean.y + 32)
		&& mean.y <= (avatar.y + 32)
	) {
		dialogueReady = true;
		}
// scenario list
	if (i< options.length) {
	dialogueImage.src = options[i];
	}
	else {
		dialogueReady = false;
	}
};

//Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (hijabReady) {
		ctx.drawImage(hijabImage, 290, 375);
	}

	if (meanReady) {
		ctx.drawImage(meanImage, 100, 360);
	}
	if (dialogueReady){
		ctx.drawImage (dialogueImage, 0, 0);
	}
	if (avatarReady){
		ctx.drawImage (avatarImage, avatar.x, avatar.y);
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