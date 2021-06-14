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
const BALLOON_HEIGHT = 35
const BALLOON_WIDTH = 20
var isAlive = true
var balloonXPosition = 300
var balloonYPosition = 400
var balloonWidth = BALLOON_WIDTH
var balloonHeight = BALLOON_HEIGHT
const BALLOON_SPEED = 12
const BALLOON_HIT_COLOR = "#94313e"
const BALLOON_COLOR = "#60aebf"

//cloud variables
var cloudXPosition = Math.random*600
var cloudYPosition
var cloudArray = []
const CLOUD_WIDTH = 60
const CLOUD_HEIGHT = 30
const CLOUD_SPEED = 5
const NUMBER_OF_CLOUDS = 5
const CLOUD_COLOR = "#d1dee6"

//coin variables
var coinArray = []
var coinXPosition
var coinYPosition
var coinsCollected = 0
const COIN_RADIUS = 20
const COIN_SPEED = 8
const NUMBER_OF_COINS = 10
const COIN_COLOR = "#e8d36b"

//bomb variables
var bombXPosition
var bombYPosition
var bombArray = []
const BOMB_WIDTH = 30
const BOMB_HEIGHT = 30
const NUMBER_OF_BOMBS = 2
const BOMB_COLOR = "#7a7c85"
const BOMB_SPEED = 10

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
	
	//create bombs
	var bombNumber = 0
	while (bombNumber < NUMBER_OF_BOMBS){
		bombArray.push(new Bomb(Math.random()* WIDTH))
		bombNumber ++
	}

}
function updateCanvas (){
	
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
	ctx.fillStyle = "white"
	ctx.fillRect (0, 0, WIDTH, HEIGHT)
	ctx.fillStyle = BALLOON_COLOR
	ctx.fillRect(balloonXPosition, balloonYPosition, balloonWidth, balloonHeight)
	
	//text displayed if you die
	if (isAlive == false){
		ctx.fillStyle = "black"
		ctx.font = "40px Calibri"
		ctx.fillText(":( you died. Press f5 to restart", 50, 280)
		console.log("testing ii")
	}
	//if coinsCollected = 20 level is over
	if (coinsCollected > 19 || innerBarHeight > OUTER_BAR_HEIGHT - 7){
		ctx.fillStyle = TEXT_COLOR
		ctx.font = "40px Calibri"
		ctx.fillText ("You completed level 1 :)", 100, 250)
		///while (balloonWidth < WIDTH){
			///balloonWidth += 10
			///balloonHeight += 10
		///} 
	}
	//move clouds
	var cloudNumber = 0
	while (cloudNumber < cloudArray.length && isAlive	){
		cloudArray[cloudNumber].moveCloud()
		cloudNumber ++
	}

	//move coins
	var coinNumber = 0
	while (coinNumber < coinArray.length && isAlive){
		coinArray[coinNumber].moveCoin()
		coinNumber ++
	}
	
	//move bombs
	var bombNumber = 0
	while (bombNumber < bombArray.length && isAlive){
		bombArray[bombNumber].moveBomb()
		bombNumber ++
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
	ctx.fillRect(coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition, COIN_RADIUS, COIN_RADIUS);
	///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
	coinNumber ++
	}
	
	//draw bombs
	ctx.fillStyle = BOMB_COLOR
	var bombNumber = 0
	while (bombNumber < bombArray.length){
		ctx.fillRect(bombArray[bombNumber].xPosition, bombArray[bombNumber].yPosition, BOMB_WIDTH, BOMB_HEIGHT)
		bombNumber ++
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
		if (balloonHitCoin (coinArray[coinNumber].xPosition, coinArray[coinNumber].yPosition)){
			coinArray[coinNumber].yPosition = Math.random()*-HEIGHT
			ctx.fillStyle = BALLOON_HIT_COLOR
			ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
			coinsCollected = coinsCollected + 1
		if(coinsCollected <= 20){
			innerBarHeight += (OUTER_BAR_HEIGHT - 6)/20
			console.log(innerBarHeight)
			console.log(coinsCollected)
		}
		}
		coinNumber ++
	}
	
	//detect bomb collisions
	var bombNumber = 0
	while (bombNumber < bombArray.length){
		if (balloonHitBomb (bombArray[bombNumber].xPosition, bombArray[bombNumber].yPosition)){
			bombArray[bombNumber].yPosition = Math.random()* - HEIGHT
			ctx.fillStyle = BALLOON_HIT_COLOR
			ctx.fillRect(balloonXPosition, balloonYPosition, BALLOON_WIDTH, BALLOON_HEIGHT)
			livesLeft -= 2
			if(livesLeft < 0){
				livesLeft = 0
			}
			///HAVE EXPLOSION GRAPHIC
		}
		bombNumber ++
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
** Class definition for the bombs
**
****/
class Bomb{
	constructor(x){
		this.xPosition = x
		this.yPosition = Math.random()* - HEIGHT - BOMB_HEIGHT
	}
	moveBomb(){
		this.yPosition += BOMB_SPEED
		if(this.yPosition > HEIGHT){
			this.yPosition = Math.random() * - HEIGHT - BOMB_HEIGHT
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

function balloonHitCoin (coinX, coinY){
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
}

function balloonHitBomb (bombX, bombY){
	var balloonHitLeft = balloonXPosition
	var balloonHitRight = balloonXPosition + BALLOON_WIDTH
	var balloonHitTop = balloonYPosition
	var balloonHitBottom = balloonYPosition + BALLOON_HEIGHT
	var balloonHitWidth = balloonHitRight-balloonHitLeft
	var balloonHitHeight = balloonHitBottom-balloonHitTop

	var bombHitLeft = bombX
	var bombHitRight = bombX + BOMB_WIDTH
	var bombHitTop = bombY
	var bombHitBottom = bombY + BOMB_HEIGHT
	var bombHitWidth = bombHitRight-bombHitLeft
	var bombHitHeight = bombHitBottom-bombHitTop

	if(balloonHitRight > bombHitLeft
		&& balloonHitLeft < bombHitRight
		&& balloonHitTop < bombHitBottom
		&& balloonHitBottom > bombHitTop)
	{
		return(true)
		}else{
			return(false)
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

