// Create the canvas
var canvas = document.createElement("canvas"); //creates screen
var ctx = canvas.getContext("2d"); //decides whether something is 2d or 3d or 1d
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); //loads in the sprites

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "mapbg.png"; //sets the background image
var blobReady = false;
var blobImage = new Image() 
blobImage.onload = function (){
	blobReady = true;
};

var blm = 

var keysDown{};
var blob = {
	speed: 200 // movement in pixels per second
};
var reset = function () {
	blob.x = canvas.width / 2;
	blob.y = canvas.height / 2;
}

var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		blob.y -= blob.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		blob.y += blob.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		blob.x -= blob.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		blob.x += blob.speed * modifier;
	}
	
	//are they touching?
	if (
	blob.x <= (hero.x + 32)
		&& hero.x <= (blob.x + 32)
		&& blob.y <= (hero.y + 32)
		&& hero.y <= (blob.y + 32)
	)
};



/* 
var keysDown = {};
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		blob.y -= blob.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		blob.y += blob.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		blob.x -= blob.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		blob.x += blob.speed * modifier;
	}

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	if (blobReady) {
		ctx.drawImage(blobImage,blob.x, blob.y)
		
	}}


	var main = function () {
	var now = Date.now();
	var delta = now - then;

	render();
	reset();
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main(); */