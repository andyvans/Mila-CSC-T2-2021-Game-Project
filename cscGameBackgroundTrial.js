/**
* Title: Assessment - Game | trialing background
* Author: Mila
* Date: 25.05/2021
* Version: 1
* Purpose: Pass this assessment with an E :)
**/

//background variables
const BACKGROUND_COLOR = "#97add1"
const WIDTH = 500
const HEIGHT = 600

//star variables
var starXPosition
var starYPosition
var starArray = []

function startCanvas(){
// The startCanvas() function sets up the game.
// This is where all of the once off startup stuff should go

ctx=document.getElementById("myCanvas").getContext("2d")
// This timer sets the framerate.
// 10 means 10 milliseconds between frames (100 frames per second)
timer = setInterval(updateCanvas, 20)
}

function updateCanvas (){
	
}
