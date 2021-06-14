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

//arrow keys
const LEFT_ARROW = 37
const RIGHT_ARROW = 39

// game screen variables
const HEIGHT = 500
const WIDTH = 600

//balloon variables
const BALLOON_HEIGHT = 50
const BALLOON_WIDTH = 30
var isAlive = true
var balloonXPosition = 300
var balloonYPosition = 400
var balloonWidth = BALLOON_WIDTH
var balloonHeight = BALLOON_HEIGHT
const BALLOON_SPEED = 10
const BALLOON_HIT_COLOR = "#94313e"
const BALLOON_COLOR = "#60aebf"

//cloud variables
var cloudXPosition = Math.random*600
var cloudYPosition
var cloudArray = []
const CLOUD_WIDTH = 60
const CLOUD_HEIGHT = 30
const CLOUD_SPEED = 5
const NUMBER_OF_CLOUDS = 8
const CLOUD_COLOR = "#d1dee6"

//coin variables
var coinArray = []
var coinXPosition
var coinYPosition
var coinsCollected = 0
const COIN_RADIUS = 20
const COIN_SPEED = 8
const NUMBER_OF_COINS = 5
const COIN_COLOR = "#e8d36b"

//text variables
const TEXT_COLOR = "black"

//lives variable
var livesLeft = 5

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

}
function updateCanvas (){
	if (livesLeft <= 0 && balloonWidth >= 0){
		balloonHeight -= 1
		balloonWidth -= 1
			if (balloonHeight == 0 || balloonWidth == 0){
				balloonHeight = 0
				balloonWidth = 0
				isAlive = false
				console.log("testing")
			}
	}
	
	///ctx.drawImage(backgroundImage,0,0)
	ctx.fillStyle = "white"
	ctx.fillRect (0, 0, WIDTH, HEIGHT)
	ctx.fillStyle = BALLOON_COLOR
	ctx.fillRect(balloonXPosition, balloonYPosition, balloonWidth, balloonHeight)
	if (isAlive == false){
		ctx.fillStyle = "black"
		ctx.font = "50px Georgia"
		ctx.fillText(":(", 200, 280)
		console.log("testing ii")
	}
	//move clouds
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive){
		cloudArray[cloudNumber].moveCloud()
		cloudNumber ++
	}

	//move coins
	var coinNumber = 0
	while (coinNumber < coinArray.length && isAlive){
		coinArray[coinNumber].moveCoin()
		coinNumber ++
	}

	//draw clouds
	ctx.fillStyle=CLOUD_COLOR
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive){
		ctx.fillRect(cloudArray[cloudNumber].xPosition, cloudArray[cloudNumber].yPosition, CLOUD_WIDTH, CLOUD_HEIGHT);
		///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
		cloudNumber ++
	}

	//detect cloud collisions
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive){
		if (isAlive && balloonHit (cloudArray[cloudNumber].xPosition, cloudArray[cloudNumber].yPosition)){
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
		if (balloonHit (coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition)){
			coinArray[coinNumber].yPosition = Math.random()*-HEIGHT
			ctx.fillStyle = BALLOON_HIT_COLOR
			ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
			coinsCollected = coinsCollected + 1
		}
		coinNumber ++
	}

	//draw coins
	ctx.fillStyle=COIN_COLOR
	var coinNumber = 0
	while (coinNumber < coinArray.length){
	ctx.fillRect(coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition, COIN_RADIUS, COIN_RADIUS);
	///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
	coinNumber ++
	}
	//ctx.fillStyle = COIN_COLOR
	//ctx.beginPath();
	//ctx.arc(coinXPosition, coinYPosition, COIN_RADIUS, 0, 2 * Math.PI);

	//tracking lives and coins
	ctx.fillStyle = TEXT_COLOR
	ctx.font = "25px Calibri"
	ctx.fillText("Lives: " + livesLeft, 20, 40)
	ctx.fillText("Coins : " + coinsCollected, 20, 70)

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
	}
	}
}

/****
**
** Below is the code for collisions between the balloon and the clouds
**
****/
function balloonHit (cloudX, cloudY){
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