/**
* Title: Assessment - Game
* Author: Mila
* Date: 10.05/2021
* Version: 1
* Purpose: Pass this assessment with an E :)
**/

console.log("help me")
var ctx
var backgroundImage = new Image()
///backgroundImage.src = 'mizu.png'
window.onload=startCanvas

//background variable
const BACKGROUND_COLOR = "#97add1"

//arrow keys
const LEFT_ARROW = 37
const RIGHT_ARROW = 39

// game screen variables
const HEIGHT = 500
const WIDTH = 600

//balloon variables
const BALLOON_HEIGHT = 35
const BALLOON_WIDTH = 20
var isAlive = true
var balloonXPosition = 300
var balloonYPosition = 400
var balloonWidth = BALLOON_WIDTH
var balloonHeight = BALLOON_HEIGHT
const BALLOON_SPEED = 20
const BALLOON_HIT_COLOR = "#94313e"
const BALLOON_COLOR = "#60aebf"

//cloud variables
var cloudXPosition = Math.random*600
var cloudYPosition
var cloudArray = []
const CLOUD_WIDTH = 60
const CLOUD_HEIGHT = 30
const CLOUD_SPEED = 4
const NUMBER_OF_CLOUDS = 5
const CLOUD_COLOR = "#d1dee6"

//coin variables
var coinArray = []
var coinXPosition
var coinYPosition
var coinsCollected = 0
const COIN_RADIUS = 10
const COIN_SPEED = 5
const NUMBER_OF_COINS = 10
const COIN_COLOR = "#e8d36b"
const COIN_EDGE_COLOR = "#d9b636"

//asteroid variables
var asteroidXPosition
var asteroidYPosition
var asteroidArray = []
const ASTEROID_WIDTH = 15
const ASTEROID_HEIGHT = 15
const NUMBER_OF_ASTEROIDS = 2
const ASTEROID_COLOR = "#7a7c85"
const ASTEROID_SPEED = 8
const ASTEROID_EDGE_COLOR = "#515557"

//text variable
const TEXT_COLOR = "black"

//lives variable
var livesLeft = 5

//level progress bar variables
const OUTER_BAR_WIDTH = 30
const OUTER_BAR_HEIGHT = HEIGHT/2
const OUTER_BAR_COLOR = "#000000"
const OUTER_BAR_XPOSITION = 550
const OUTER_BAR_YPOSITION = 0 + HEIGHT/4
const INNER_BAR_WIDTH = OUTER_BAR_WIDTH - 4
var innerBarHeight = 2
const INNER_BAR_XPOSITION = OUTER_BAR_XPOSITION + 2
const INNER_BAR_YPOSITION = OUTER_BAR_YPOSITION + 2
var innerBarColor = "#e8d36b"

//checking for keyDown
function keyDownFunction(keyboardEvent){
var keyDown = keyboardEvent.keyCode
console.log("You pressed "+keyDown)

//check if arrow keys are pressed
if(keyDown == LEFT_ARROW){
balloonXPosition -= BALLOON_SPEED
}
if(keyDown == RIGHT_ARROW){
balloonXPosition += BALLOON_SPEED
}
}

function startCanvas(){
// The startCanvas() function sets up the game.
// This is where all of the once off startup stuff should go

	ctx=document.getElementById("myCanvas").getContext("2d")
	// This timer sets the framerate.
	// 10 means 10 milliseconds between frames (100 frames per second)
	timer = setInterval(updateCanvas, 20)
	window.addEventListener('keydown', keyDownFunction)

	//create clouds
	var cloudNumber = 0
	while(cloudNumber < NUMBER_OF_CLOUDS){
		cloudArray.push(new Cloud(Math.random()* WIDTH))
		cloudNumber++;
	}

	//create coins
	var coinNumber = 0
	while(coinNumber < NUMBER_OF_COINS){
		coinArray.push(new Coin(Math.random()* WIDTH))
		coinNumber++;
	}

	//create asteroid
	var asteroidNumber = 0
	while (asteroidNumber < NUMBER_OF_ASTEROIDS){
		asteroidArray.push(new Asteroid(Math.random()* WIDTH))
		asteroidNumber ++
	}

}
function updateCanvas (){
	isAlive = true
	coinsCollected = 0
	if (!isAlive) return

	//shrink the player if there are no lives left
	if (livesLeft <= 0 && balloonWidth >= 0 ){
		balloonHeight -= 1
		balloonWidth -= 1
	if (balloonHeight == 0 || balloonWidth == 0){
		balloonHeight = 0
		balloonWidth = 0
		isAlive = false
		console.log("testing")
	}
	}


	//so the player stays inside the canvas
	if(balloonXPosition < 0){
		balloonXPosition += 30
	}else if (balloonXPosition > WIDTH - BALLOON_WIDTH){
		balloonXPosition -= 30
	}

	///ctx.drawImage(backgroundImage,0,0)
	//draw the player and background
	ctx.fillStyle = BACKGROUND_COLOR
	ctx.fillRect (0, 0, WIDTH, HEIGHT)
	ctx.fillStyle = BALLOON_COLOR
	ctx.fillRect(balloonXPosition, balloonYPosition, balloonWidth, balloonHeight)

	//text displayed if you die
	if (isAlive == false){
		ctx.fillStyle = "black"
		ctx.font = "40px Calibri"
		ctx.fillText(":( you died. Press F5 to restart", 50, 280)
		console.log("testing ii")
	}
	
	//if coinsCollected = 20 level is over
	if (isAlive == true){
		console.log("whyy?")
		if (coinsCollected = 20){
			ctx.fillStyle = TEXT_COLOR
			ctx.font = "40px Calibri"
			ctx.fillText ("You completed level 1 :)", 100, 250)
			///while (balloonWidth < WIDTH){
			///balloonWidth += 10
			///balloonHeight += 10
			///}
		}
	}
	//move clouds
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive ){
		cloudArray[cloudNumber].moveCloud()
		cloudNumber ++
	}

	//move coins
	var coinNumber = 0
	while (coinNumber < coinArray.length && isAlive){
		coinArray[coinNumber].moveCoin()
		coinNumber ++
	}

	//move asteroid
	var asteroidNumber = 0
	while (asteroidNumber < asteroidArray.length && isAlive){
		asteroidArray[asteroidNumber].moveAsteroid()
		asteroidNumber ++
	}

	//draw clouds
	ctx.fillStyle=CLOUD_COLOR
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive){
		ctx.fillRect(cloudArray[cloudNumber].xPosition, cloudArray[cloudNumber].yPosition, CLOUD_WIDTH, CLOUD_HEIGHT);
		///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
		cloudNumber ++
	}

	//draw coins
	ctx.fillStyle=COIN_COLOR
	var coinNumber = 0
	while (coinNumber < coinArray.length){
		///ctx.fillRect(coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition, COIN_RADIUS, COIN_RADIUS);
		///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
		var centerXCoin = coinArray[coinNumber].xPosition + COIN_RADIUS/2
		var centerYCoin = coinArray[coinNumber].yPosition + COIN_RADIUS/2
		drawCircle(ctx, centerXCoin, centerYCoin, COIN_RADIUS, COIN_COLOR, COIN_EDGE_COLOR, 2)
		coinNumber ++
	}

	//draw asteroid
	ctx.fillStyle = ASTEROID_COLOR
	var asteroidNumber = 0
	while (asteroidNumber < asteroidArray.length){
		var centerXAsteroid = asteroidArray[asteroidNumber].xPosition + ASTEROID_WIDTH/2
		var centerYAsteroid = asteroidArray[asteroidNumber].yPosition + ASTEROID_WIDTH/2
		drawCircle(ctx, centerXAsteroid, centerYAsteroid, ASTEROID_WIDTH, ASTEROID_COLOR, ASTEROID_EDGE_COLOR, 2)
		ctx.fillRect(asteroidArray[asteroidNumber].xPosition, asteroidArray[asteroidNumber].yPosition, ASTEROID_WIDTH, ASTEROID_HEIGHT)
		asteroidNumber ++
	}

	//detect cloud collisions
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive){
	if (isAlive && balloonHitCloud (cloudArray[cloudNumber].xPosition, cloudArray[cloudNumber].yPosition)){
		cloudArray[cloudNumber].yPosition = Math.random()*-HEIGHT
		ctx.fillStyle = BALLOON_HIT_COLOR
		ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
		livesLeft = livesLeft - 1
	}
	cloudNumber ++
	}

	//detect coin collisions
	var coinNumber = 0
	while (coinNumber < coinArray.length){
	if (balloonHitCircle (coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition, COIN_RADIUS)){
		coinArray[coinNumber].yPosition = Math.random()*-HEIGHT
		ctx.fillStyle = BALLOON_HIT_COLOR
		ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
		coinsCollected += 1
		if(coinsCollected <= 20){
			innerBarHeight += (OUTER_BAR_HEIGHT - 6)/20
			console.log(innerBarHeight)
			console.log(coinsCollected)
		}
	}
	coinNumber ++
	}

	//detect asteroid collisions
	var asteroidNumber = 0
	while (asteroidNumber < asteroidArray.length){
	if (balloonHitCircle (asteroidArray[asteroidNumber].xPosition, asteroidArray[asteroidNumber].yPosition, ASTEROID_WIDTH)){
		asteroidArray[asteroidNumber].yPosition = Math.random()* - HEIGHT
		ctx.fillStyle = BALLOON_HIT_COLOR
		ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
		livesLeft -= 2
		if(livesLeft < 0){
			livesLeft = 0
	}
	///HAVE EXPLOSION GRAPHIC
	}
	asteroidNumber ++
	}


	//ctx.fillStyle = COIN_COLOR
	//ctx.beginPath();
	//ctx.arc(coinXPosition, coinYPosition, COIN_RADIUS, 0, 2 * Math.PI);

	//tracking lives and coins
	ctx.fillStyle = TEXT_COLOR
	ctx.font = "25px Calibri"
	ctx.fillText("Lives: " + livesLeft, 20, 40)
	ctx.fillText("Coins : " + coinsCollected, 20, 70)


	//drawing level progress bar
	ctx.fillStyle = OUTER_BAR_COLOR
	console.log("testing again")
	ctx.fillRect(OUTER_BAR_XPOSITION, OUTER_BAR_YPOSITION, OUTER_BAR_WIDTH, OUTER_BAR_HEIGHT)
	ctx.fillStyle = innerBarColor
	ctx.fillRect (INNER_BAR_XPOSITION, INNER_BAR_YPOSITION, INNER_BAR_WIDTH, innerBarHeight)

}

/****
**
** Class definition for the clouds
**
****/
class Cloud{
	constructor(x){
	this.xPosition = x
	this.yPosition = Math.random()* - HEIGHT - CLOUD_HEIGHT
}
moveCloud(){
	this.yPosition += CLOUD_SPEED
	if(this.yPosition > HEIGHT){
		this.yPosition = Math.random() * - HEIGHT - CLOUD_HEIGHT
		this.xPosition = Math.random()* WIDTH
}
}
}

/****
**
** Class definition for the coins
**
****/
class Coin{
	constructor(x){
	this.xPosition = x
	this.yPosition = Math.random()* - HEIGHT - COIN_RADIUS
}
moveCoin(){
	this.yPosition += COIN_SPEED
	if(this.yPosition > HEIGHT){
		this.yPosition = Math.random() * - HEIGHT - COIN_RADIUS
		this.xPosition = Math.random()* WIDTH
	}
}
}

/****
**
** Class definition for the asteroid
**
****/
class Asteroid{
	constructor(x){
	this.xPosition = x
	this.yPosition = Math.random()* - HEIGHT - ASTEROID_HEIGHT
}
moveAsteroid(){
	this.yPosition += ASTEROID_SPEED
	if(this.yPosition > HEIGHT){
		this.yPosition = Math.random() * - HEIGHT - ASTEROID_HEIGHT
		this.xPosition = Math.random()* WIDTH
}
}
}

/****
**
** collisions between the balloon and the objects
**
****/
function balloonHitCloud (cloudX, cloudY){
	var balloonHitLeft = balloonXPosition
	var balloonHitRight = balloonXPosition + BALLOON_WIDTH
	var balloonHitTop = balloonYPosition
	var balloonHitBottom = balloonYPosition + BALLOON_HEIGHT
	var balloonHitWidth = balloonHitRight-balloonHitLeft
	var balloonHitHeight = balloonHitBottom-balloonHitTop

	var cloudHitLeft = cloudX
	var cloudHitRight = cloudX + CLOUD_WIDTH
	var cloudHitTop = cloudY
	var cloudHitBottom = cloudY + CLOUD_HEIGHT
	var cloudHitWidth = cloudHitRight-cloudHitLeft
	var cloudHitHeight = cloudHitBottom-cloudHitTop

	if(balloonHitRight > cloudHitLeft
		&& balloonHitLeft < cloudHitRight
		&& balloonHitTop < cloudHitBottom
		&& balloonHitBottom > cloudHitTop)
	{
	return(true)
	}else{
	return(false)
}
}

/* function balloonHitCoin (coinX, coinY){
var balloonHitLeft = balloonXPosition
var balloonHitRight = balloonXPosition + BALLOON_WIDTH
var balloonHitTop = balloonYPosition
var balloonHitBottom = balloonYPosition + BALLOON_HEIGHT
var balloonHitWidth = balloonHitRight-balloonHitLeft
var balloonHitHeight = balloonHitBottom-balloonHitTop

var coinHitLeft = coinX
var coinHitRight = coinX + COIN_RADIUS
var coinHitTop = coinY
var coinHitBottom = coinY + COIN_RADIUS
var coinHitWidth = coinHitRight-coinHitLeft
var coinHitHeight = coinHitBottom-coinHitTop

if(balloonHitRight > coinHitLeft
&& balloonHitLeft < coinHitRight
&& balloonHitTop < coinHitBottom
&& balloonHitBottom > coinHitTop)
{
return(true)
}else{
return(false)
}
} */
/*
function balloonHitAsteroid (asteroidX, asteroidY){
var balloonHitLeft = balloonXPosition
var balloonHitRight = balloonXPosition + BALLOON_WIDTH
var balloonHitTop = balloonYPosition
var balloonHitBottom = balloonYPosition + BALLOON_HEIGHT
var balloonHitWidth = balloonHitRight-balloonHitLeft
var balloonHitHeight = balloonHitBottom-balloonHitTop

var asteroidHitLeft = asteroidX
var asteroidHitRight = asteroidX + ASTEROID_WIDTH
var asteroidHitTop = asteroidY
var asteroidHitBottom = asteroidY + ASTEROID_HEIGHT
var asteroidHitWidth = asteroidHitRight-asteroidHitLeft
var asteroidHitHeight = asteroidHitBottom-asteroidHitTop

if(balloonHitRight > asteroidHitLeft
&& balloonHitLeft < asteroidHitRight
&& balloonHitTop < asteroidHitBottom
&& balloonHitBottom > asteroidHitTop)
{
return(true)
}else{
return(false)
}
} */

function balloonHitCircle (objectX, objectY, objectRadius){
	var xDiff = balloonXPosition - objectX
	var yDiff = balloonYPosition - objectY
	var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
	var hasCollided = (dist - objectRadius - BALLOON_WIDTH) <= 0 ? true : false
	console.log("xDiff " + xDiff + " yDiff " + yDiff + " dist " + dist)
	return hasCollided
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}

/****
**
** gameOver
**
****/
///function gameOver(){
///if (){
///return (true)

///}
///}
