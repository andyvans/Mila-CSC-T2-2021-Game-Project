/**
* Title: Assessment - Game
* Author: Mila
* Date: 10.05/2021
* Version: 1
* Purpose: Pass this assessment with an E :)
**/

var ctx
window.onload = startCanvas

//background variable
var levelBackgroundColours = ["lightBlue", "PowderBlue", "LightSkyBlue", "SkyBlue", "CornFlowerBlue", "SkyBlue", "LightSkyBlue"]
var showLevelMessageExpiry = 0
var crackedHelmetImage = new Image()
crackedHelmetImage.src = 'cracked-helmet.png'
var crackedHelmetWidth = 200
var crackedHelmetHeight = 200

//arrow keys
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const SPACE_BAR = 32

// game screen variables
const HEIGHT = 500
const WIDTH = 800

//rocket variables
const ROCKET_HEIGHT = 45
const ROCKET_WIDTH = 25
const ROCKET_HIT_FUEL_COLOR = "#edd974"
const ROCKET_HIT_OBSTACLE_COLOR = "#c42727"
const ROCKET_COLOR = "#60aebf"
var isAlive = true
var rocketXPosition = 300
var rocketYPosition = 400
var rocketWidth = ROCKET_WIDTH
var rocketHeight = ROCKET_HEIGHT
var rocketSpeed = 20
var rocketImage = new Image(rocketWidth, rocketHeight)
rocketImage.src = 'rocket.png'
var rocketLeftImage = new Image(rocketWidth, rocketHeight)
rocketLeftImage.src = 'rocketAngledLeft.png'
var rocketRightImage = new Image(rocketWidth, rocketHeight)
rocketRightImage.src = 'rocketAngledRight.png'
var moveLeftTime = 0
var moveRightTime = 0

//satellite variables
const SATELLITE_WIDTH = 60
const SATELLITE_HEIGHT = 30
const SATELLITE_SPEED = 4
const NUMBER_OF_SATELLITES = 5
const SATELLITE_COLOR = "#d1dee6"
var satelliteXPosition = Math.random * WIDTH
var satelliteYPosition
var satelliteArray = []
var satelliteImage = new Image(SATELLITE_WIDTH, SATELLITE_HEIGHT)
satelliteImage.src = 'NASA-satellite.png'
var satelliteLeftImage = new Image(SATELLITE_WIDTH, SATELLITE_HEIGHT)
satelliteLeftImage.src = 'NASA-satellite-left.png'
var satelliteRightImage = new Image(SATELLITE_WIDTH, SATELLITE_HEIGHT)
satelliteRightImage.src = 'NASA-satellite-right.png'
var satelliteImageArray = [satelliteImage, satelliteLeftImage, satelliteRightImage]

//fuel variables
var fuelArray = []
var fuelXPosition
var fuelYPosition
var fuelsCollected = 0
var fuelsPerLevel = 10
const FUEL_RADIUS = 10
const FUEL_SPEED = 5
const NUMBER_OF_FUELS = 10
const FUEL_COLOR = "#e8d36b"
const FUEL_EDGE_COLOR = "#d9b636"

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
const ASTEROID_INNER_EDGE_COLOR = "#695e5d"
const ASTEROID_INNER_CIRCLE_COLOR = "#a5abb0"
const ASTEROID_INNER_CIRCLE_SHADE_COLOR = "#7a7c7d"

//text variable
const TEXT_COLOR = "black"

//lives variable
var livesLeft = 10
var currentLevel = 1

//level progress bar variables
const OUTER_BAR_WIDTH = 30
const OUTER_BAR_HEIGHT = HEIGHT / 2
const OUTER_BAR_BORDER = 4
const OUTER_BAR_COLOR = "#000000"
const OUTER_BAR_XPOSITION = WIDTH - 50
const OUTER_BAR_YPOSITION = 0 + HEIGHT / 4
const INNER_BAR_WIDTH = OUTER_BAR_WIDTH - 4
var innerBarHeight = 0
const INNER_BAR_XPOSITION = OUTER_BAR_XPOSITION + 2
const INNER_BAR_YPOSITION = OUTER_BAR_YPOSITION + 2
var innerBarColor = "#e8d36b"

//checking for keyDown
function keyDownFunction(keyboardEvent) {
  var keyDown = keyboardEvent.keyCode
  //console.log("You pressed "+keyDown)

  //check if arrow keys are pressed
  if (keyDown == LEFT_ARROW) {
    //rocketSpeed = 0
    rocketSpeed = - 20
    rocketXPosition += rocketSpeed
    moveLeftTime = new Date().getTime()
    moveRightTime = 0
    //rocketSpeed += 5
    //console.log(rocketSpeed)
  }
  if (keyDown == RIGHT_ARROW) {
    //rocketSpeed = 0
    rocketSpeed = 20
    rocketXPosition += rocketSpeed
    moveRightTime = new Date().getTime()
    moveLeftTime = 0
    //rocketSpeed += 5
    //console.log(rocketSpeed)
  }
  if (keyDown == SPACE_BAR) {
    location.reload()
  }
}

function startCanvas() {
  // The startCanvas() function sets up the game.
  // This is where all of the once off startup stuff should go
  ctx = document.getElementById("myCanvas").getContext("2d")

  // This timer sets the framerate.
  // 10 means 10 milliseconds between frames (100 frames per second)
  timer = setInterval(updateCanvas, 20)
  window.addEventListener('keydown', keyDownFunction)

  //create satellites
  var satelliteNumber = 0
  while (satelliteNumber < NUMBER_OF_SATELLITES) {
   // var sIndex = Math.floor(Math.random()*3)
   // var sImage = satelliteImageArray[sIndex]
    //console.log('satellite ' + sIndex)
    satelliteArray.push(new Satellite(satelliteImageArray))
    satelliteNumber++;
  }

  //create fuels
  var fuelNumber = 0
  while (fuelNumber < NUMBER_OF_FUELS) {
    fuelArray.push(new Fuel())
    fuelNumber++;
  }

  //create asteroid
  var asteroidNumber = 0
  while (asteroidNumber < NUMBER_OF_ASTEROIDS) {
    asteroidArray.push(new Asteroid())
    asteroidNumber++
  }
}

function updateCanvas() {

  //shrink the player if there are no lives left
  if (livesLeft <= 0 && rocketWidth >= 0) {
    rocketHeight -= 1
    rocketWidth -= 1
    if (rocketHeight == 0 || rocketWidth == 0) {
      rocketHeight = 0
      rocketWidth = 0
      isAlive = false
      console.log("Now dead")
    }
  }


  //so the player stays inside the canvas
  if (rocketXPosition < 0) {
    rocketXPosition += ROCKET_WIDTH
  } else if (rocketXPosition > WIDTH - ROCKET_WIDTH) {
    rocketXPosition -= ROCKET_WIDTH
  }

  //pick the level colour and draw the background
  var currentLevelBackground = currentLevel % levelBackgroundColours.length
  var levelColour = levelBackgroundColours[currentLevelBackground]
  ctx.fillStyle = levelColour
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  //draw the player
  //ctx.fillStyle = ROCKET_COLOR
  //ctx.fillRect(rocketXPosition, rocketYPosition, rocketWidth, rocketHeight)


  //display angled rocket images for when moving left or right
  var currentTime = new Date().getTime()
  var expiry = 420
  var turningWidth = 8
  if (moveLeftTime + expiry > currentTime) {
    ctx.drawImage(rocketLeftImage, rocketXPosition, rocketYPosition, rocketWidth + turningWidth, rocketHeight)
  } else if (moveRightTime + expiry > currentTime) {
    ctx.drawImage(rocketRightImage, rocketXPosition, rocketYPosition, rocketWidth + turningWidth, rocketHeight)
  } else {
    ctx.drawImage(rocketImage, rocketXPosition, rocketYPosition, rocketWidth, rocketHeight)
  }


  //move satellites
  var satelliteNumber = 0
  while (satelliteNumber < satelliteArray.length && isAlive) {
    satelliteArray[satelliteNumber].moveSatellite()
    satelliteNumber++
  }

  //move fuels
  var fuelNumber = 0
  while (fuelNumber < fuelArray.length && isAlive) {
    fuelArray[fuelNumber].moveFuel()
    fuelNumber++
  }

  //move asteroid
  var asteroidNumber = 0
  while (asteroidNumber < asteroidArray.length && isAlive) {
    asteroidArray[asteroidNumber].moveAsteroid()
    asteroidNumber++
  }

  //draw satellites
  ctx.fillStyle = SATELLITE_COLOR
  var satelliteNumber = 0
  while (satelliteNumber < satelliteArray.length && isAlive) {
    var selectedSatellite = satelliteArray[satelliteNumber]
    //ctx.fillRect(satelliteArray[satelliteNumber].xPosition, satelliteArray[satelliteNumber].yPosition, SATELLITE_WIDTH, SATELLITE_HEIGHT);
    var satelliteXCenter = selectedSatellite.xPosition + SATELLITE_WIDTH/2
    var satelliteYCenter = selectedSatellite.yPosition + SATELLITE_HEIGHT/2
   // ctx.translate(satelliteXCenter, satelliteYCenter)
    //ctx.rotate(0.52) //~30 degrees in radians
    ctx.drawImage(selectedSatellite.image, selectedSatellite.xPosition, selectedSatellite.yPosition, SATELLITE_WIDTH, SATELLITE_HEIGHT)
    //ctx.rotate(-0.52) //reversing the rotation
    //ctx.translate(-satelliteXCenter, -satelliteYCenter)
    //ctx.drawImage(satelliteImage, satelliteArray[satelliteNumber].xPosition, satelliteArray[satelliteNumber].yPosition, SATELLITE_WIDTH, SATELLITE_HEIGHT)
    satelliteNumber++
  }

  //draw fuels
  ctx.fillStyle = FUEL_COLOR
  var fuelNumber = 0
  while (fuelNumber < fuelArray.length) {
    ///ctx.fillRect(fuelArray[fuelNumber].xPosition, fuelArray[fuelNumber].yPosition, FUEL_RADIUS, FUEL_RADIUS);
    ///ctx.drawImage(rainImage,rainArray[dropNumber].xPosition, rainArray[dropNumber].yPosition, RAIN_WIDTH, RAIN_HEIGHT)
    var centerXFuel = fuelArray[fuelNumber].xPosition + FUEL_RADIUS / 2
    var centerYFuel = fuelArray[fuelNumber].yPosition + FUEL_RADIUS / 2
    drawCircle(ctx, centerXFuel, centerYFuel, FUEL_RADIUS, FUEL_COLOR, FUEL_EDGE_COLOR, 2)
    fuelNumber++
  }

  //draw asteroid
  ctx.fillStyle = ASTEROID_COLOR
  var asteroidNumber = 0
  while (asteroidNumber < asteroidArray.length) {
    var centerXAsteroid = asteroidArray[asteroidNumber].xPosition + ASTEROID_WIDTH / 2
    var centerYAsteroid = asteroidArray[asteroidNumber].yPosition + ASTEROID_WIDTH / 2
    drawCircle(ctx, centerXAsteroid, centerYAsteroid, ASTEROID_WIDTH, ASTEROID_COLOR, ASTEROID_EDGE_COLOR, 2)
    drawCircle(ctx, centerXAsteroid + ASTEROID_WIDTH/3, centerYAsteroid - ASTEROID_WIDTH/4, ASTEROID_WIDTH/3, ASTEROID_INNER_CIRCLE_COLOR, ASTEROID_INNER_EDGE_COLOR, 2)
    //ctx.fillRect(asteroidArray[asteroidNumber].xPosition, asteroidArray[asteroidNumber].yPosition, ASTEROID_WIDTH, ASTEROID_HEIGHT)
    ctx.arc(centerXAsteroid, centerYAsteroid, ASTEROID_WIDTH, Math.PI, 0, true);
    ctx.fill()
    ctx.stroke();
    asteroidNumber++
  }

  //detect satellite collisions
  var satelliteNumber = 0
  while (satelliteNumber < satelliteArray.length && isAlive) {
    if (isAlive && rocketHitSatellite(satelliteArray[satelliteNumber].xPosition, satelliteArray[satelliteNumber].yPosition)) {
      satelliteArray[satelliteNumber].yPosition = Math.random() * -HEIGHT
      //ctx.fillStyle = ROCKET_HIT_OBSTACLE_COLOR
      //ctx.fillRect(rocketXPosition, rocketYPosition, rocketWidth, rocketHeight)
      drawCircle(ctx, rocketXPosition + rocketWidth/2, rocketYPosition + rocketHeight/2, Math.max(rocketWidth, rocketHeight), ROCKET_HIT_OBSTACLE_COLOR, ROCKET_HIT_OBSTACLE_COLOR, 5)
      livesLeft = livesLeft - 1
    }
    satelliteNumber++
  }

  //detect fuel collisions
  var fuelNumber = 0
  while (fuelNumber < fuelArray.length) {
    if (rocketHitCircle(fuelArray[fuelNumber].xPosition, fuelArray[fuelNumber].yPosition, FUEL_RADIUS)) {
      fuelArray[fuelNumber].yPosition = Math.random() * -HEIGHT
      //ctx.fillStyle = ROCKET_HIT_FUEL_COLOR
      //ctx.fillRect(rocketXPosition, rocketYPosition, rocketWidth, rocketHeight)
      drawCircle(ctx, rocketXPosition + rocketWidth/2, rocketYPosition + rocketHeight/2, Math.max(rocketWidth, rocketHeight), ROCKET_HIT_FUEL_COLOR, ROCKET_HIT_FUEL_COLOR, 5)
      fuelsCollected += 1
      console.log("fuels " + fuelsCollected)
      var barProgress = (fuelsCollected % fuelsPerLevel) / fuelsPerLevel
      console.log("bar " + barProgress)
      innerBarHeight = Math.min(OUTER_BAR_HEIGHT - OUTER_BAR_BORDER, (OUTER_BAR_HEIGHT - OUTER_BAR_BORDER) * barProgress)
    }
    fuelNumber++
  }

  //detect asteroid collisions
  var asteroidNumber = 0
  while (asteroidNumber < asteroidArray.length) {
    if (rocketHitCircle(asteroidArray[asteroidNumber].xPosition, asteroidArray[asteroidNumber].yPosition, ASTEROID_WIDTH)) {
      asteroidArray[asteroidNumber].yPosition = Math.random() * - HEIGHT
      //ctx.fillStyle = ROCKET_HIT_OBSTACLE_COLOR
      //ctx.fillRect(rocketXPosition, rocketYPosition, rocketWidth, rocketHeight)
      drawCircle(ctx, rocketXPosition + rocketWidth/2, rocketYPosition + rocketHeight/2, Math.max(rocketWidth, rocketHeight), ROCKET_HIT_OBSTACLE_COLOR, ROCKET_HIT_OBSTACLE_COLOR, 5)
      livesLeft -= 2
      if (livesLeft < 0) {
        livesLeft = 0
      }
      ///HAVE EXPLOSION GRAPHIC
    }
    asteroidNumber++
  }

  //check if we move to the next level
  if (isAlive && fuelsCollected > (currentLevel * fuelsPerLevel)) {
    currentLevel++
    console.log("Now on level " + currentLevel)
    showLevelMessageExpiry = new Date().getTime() + 1000
  }

  //show the next level message until it expires
  var currentTime = new Date().getTime()
  if (currentTime < showLevelMessageExpiry) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = "40px Courier New"
    ctx.fillText("You completed level " + (currentLevel - 1) + " :)", 100, 250)
  }

  //tracking lives and fuels
  ctx.fillStyle = TEXT_COLOR
  ctx.font = "20px Calibri"
  ctx.fillText("Lives: " + livesLeft, 10, 30)
  ctx.fillText("Fuel : " + fuelsCollected, 10, 50)
  ctx.fillText("Level : " + currentLevel, 10, 70)

  //drawing level progress bar
  ctx.fillStyle = OUTER_BAR_COLOR
  ctx.fillRect(OUTER_BAR_XPOSITION, OUTER_BAR_YPOSITION, OUTER_BAR_WIDTH, OUTER_BAR_HEIGHT)
  ctx.fillStyle = innerBarColor
  var fuelOffset = OUTER_BAR_HEIGHT - innerBarHeight - 4
  ctx.fillRect(INNER_BAR_XPOSITION, INNER_BAR_YPOSITION + fuelOffset, INNER_BAR_WIDTH, innerBarHeight)

  //text displayed if you die
  if (!isAlive) {
    ctx.fillStyle = "black"
    ctx.font = "30px Impact"
    ctx.drawImage(crackedHelmetImage, WIDTH/2 - crackedHelmetWidth/2, crackedHelmetHeight + rocketHeight, crackedHelmetWidth, crackedHelmetHeight)
    ctx.fillText(":( you died. Press SPACE to restart", WIDTH/4, HEIGHT - WIDTH/12)
  }

  //if you complete level 10, you have successfully arrived at Mars
  ///do the code for it here
}


/****
**
** Class definition for the satellites
**
****/
class Satellite {
  constructor(images) {
    this.xPosition = Math.random() * WIDTH
    this.yPosition = Math.random() * - HEIGHT - SATELLITE_HEIGHT
    this.images = images
    this.setRandomImage()
  }
  moveSatellite() {
    this.yPosition += SATELLITE_SPEED
    if (this.yPosition > HEIGHT) {
      this.yPosition = Math.random() * - HEIGHT - SATELLITE_HEIGHT
      this.xPosition = Math.random() * WIDTH
      this.setRandomImage()
    }
  }
  setRandomImage(){
    this.image = this.images[Math.floor(Math.random()*this.images.length)]
  }
}

/****
**
** Class definition for the fuels
**
****/
class Fuel {
  constructor() {
    this.xPosition = Math.random() * WIDTH
    this.yPosition = Math.random() * - HEIGHT - FUEL_RADIUS
  }
  moveFuel() {
    this.yPosition += FUEL_SPEED
    if (this.yPosition > HEIGHT) {
      this.yPosition = Math.random() * - HEIGHT - FUEL_RADIUS
      this.xPosition = Math.random() * WIDTH
    }
  }
}

/****
**
** Class definition for the asteroid
**
****/
class Asteroid {
  constructor() {
    this.xPosition = Math.random() * WIDTH
    this.yPosition = Math.random() * - HEIGHT - ASTEROID_HEIGHT
  }
  moveAsteroid() {
    this.yPosition += ASTEROID_SPEED
    if (this.yPosition > HEIGHT) {
      this.yPosition = Math.random() * - HEIGHT - ASTEROID_HEIGHT
      this.xPosition = Math.random() * WIDTH
    }
  }
}

/****
**
** collisions between the rocket and the objects
**
****/
function rocketHitSatellite(satelliteX, satelliteY) {
  var rocketHitLeft = rocketXPosition
  var rocketHitRight = rocketXPosition + ROCKET_WIDTH
  var rocketHitTop = rocketYPosition
  var rocketHitBottom = rocketYPosition + ROCKET_HEIGHT
  var rocketHitWidth = rocketHitRight - rocketHitLeft
  var rocketHitHeight = rocketHitBottom - rocketHitTop

  var satelliteHitLeft = satelliteX
  var satelliteHitRight = satelliteX + SATELLITE_WIDTH
  var satelliteHitTop = satelliteY
  var satelliteHitBottom = satelliteY + SATELLITE_HEIGHT
  var satelliteHitWidth = satelliteHitRight - satelliteHitLeft
  var satelliteHitHeight = satelliteHitBottom - satelliteHitTop

  if (rocketHitRight > satelliteHitLeft
    && rocketHitLeft < satelliteHitRight
    && rocketHitTop < satelliteHitBottom
    && rocketHitBottom > satelliteHitTop) {
    return (true)
  } else {
    return (false)
  }
}


function rocketHitCircle(objectX, objectY, objectRadius) {
  var xDiff = rocketXPosition - objectX
  var yDiff = rocketYPosition - objectY
  var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  var hasCollided = (dist - objectRadius - rocketWidth) <= 0 ? true : false
  //console.log("xDiff " + xDiff + " yDiff " + yDiff + " dist " + dist)
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

