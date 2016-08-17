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
bgImage.src = "wh_images/background.png"; //sets the background image

// Hero image
var blobReady = false;
var blobImage = new Image();
blobImage.onload = function () {
	blobReady = true;
};
blobImage.src = "wh_images/blob.png"; //loads in a hero avatar

// woman image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "wh_images/woman.gif"; //loads in a woman avatar

var benchReady = false;
var benchImage = new Image();
benchImage.onload = function() {
	benchReady = true;
};
benchImage.src = "wh_images/bench.png"; 

var babyReady = false;
var babyImage = new Image();
babyImage.onload = function(){
	babyReady = true;
};
babyImage.src = "wh_images/babycopy.png";

var bushReady = false;
var bushImage = new Image();
bushImage.onload = function(){
	bushReady = true;
};
bushImage.src = "wh_images/bush.png";

var angrywomanReady = false;
var angrywomanImage = new Image();
angrywomanImage.onload = function(){
	angrywomanReady = true;
};
angrywomanImage.src = "wh_images/oie_transparent.png";
x = 100
y = 250
/* var textReady = false;
var textImage = new Image();
textImage.onload = function(){
	textReady = false;
};
textImage.src = "text.png";
 */
var femScenario = ["wh_images/womantext1.png", "wh_images/womantext2.png", 
					"wh_images/stephchoices.png","wh_images/schoice1.png", 
					"wh_images/schoice2.png", "wh_images/schoice31.png", "wh_images/schoice32.png",
					 ""];
// Textbox popup
var j = 0;
var textReady = false;
var textImage = new Image();
textImage.onload = function () {
	textReady = false;
};
textImage.src = femScenario[i];


// Game objects
var blob = {
	speed: 200 // movement in pixels per second
};

var hero = {};
var score = 0; //sets speed of hero and sets variables so that you know how many 
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function(e){
if (e.keyCode == 32){
	if ((e.keyCode == 32)&& (j == 2)){
		j = 1;
	}
	
	if ((e.keyCode == 32)&& (j == 3)){
		//j = femScenario.lastIndex;
		j = 4;
		score-=1;
	}
	if ((e.keyCode == 32)&&(j==4)){
		j = femScenario.lastIndex;
		score -=4;
		}
/* 	if ((e.keyCode == 32) && (j == 5)){
		j = 5;
		//i++;
		}*/
		
	  if ((e.keyCode == 32) && (j == 6)){
		j = femScenario.lastIndex;
		score += 3;
		} 
		
		j++;
	}
}, false);

addEventListener("keydown", function(e){
	if (e.keyCode == 49){ 
		j = 3;
		textReady = true;
	}

}, false);
addEventListener("keydown", function(e){
	if (e.keyCode == 50){ 
		j = 4;
		textReady = true;
	}
}, false);
addEventListener("keydown", function(e){
	if (e.keyCode == 51){ 
		j = 5;
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

	
	// Reset the game when the player catches a blob
var reset = function () {
	blob.x = canvas.width / 2;
	blob.y = canvas.height / 2;

	// Throw the blob somewhere on the screen randomly
	hero.x = 270;
	hero.y = 275;
};

//var screen = document.getElementById("level")
//function changeScreen(){
//	screen.src = "

// Update game objects
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
	

	// Are they touching?
	if (
		blob.x <= (x + 32)
		&& x <= (blob.x + 32)
		&& blob.y <= (y + 32)
		&& y <= (blob.y + 32) //arrow keys functions
	) {
			textReady = true;
	}
	
	if (j < femScenario.length){
		textImage.src = femScenario[j];
		}
		else {
		textReady = false;
		}
		//if (blob.x > screen.width){
			//changeScreen();
			
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (benchReady) {
		ctx.drawImage(benchImage, 256, 240);
	}
	if (blobReady) {
		ctx.drawImage(blobImage, blob.x, blob.y);
	}
	if (babyReady){
		ctx.drawImage(babyImage, 315, 260);
	}
	if (angrywomanReady) {
		ctx.drawImage(angrywomanImage, 100, 250);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	
	if (bushReady){
		ctx.drawImage(bushImage, 50,50);
	}
	if (bushReady){
		ctx.drawImage(bushImage, 250,10);
	}
	if (bushReady){
		ctx.drawImage(bushImage, 340,290);
	}
	if (textReady){
		ctx.drawImage(textImage, 0,0);
	}
	
	
//Score
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