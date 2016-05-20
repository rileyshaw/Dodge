var canvas, context;

var balls = [];


function init(){
	balls.push(new Ball(10,10,10));
}

function newTarget(){

}

$(document).ready(function() {
	canvas = document.getElementById("canv");
	context = canvas.getContext("2d");
	init();
	var time = new Date().getTime();
	animate(time);

});
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000/60);
      };
 })();

 function calcMove(deltaTime){
	var speed = 0.025 * deltaTime;
	for(var i = 0; i < balls.length;i++){
		//console.log(balls[i].target.y-balls[i].y);
		//console.log(balls[i].target.x-balls[i].x);
		var xcomp = balls[i].target.x-balls[i].x;
		var ycomp = balls[i].target.y-balls[i].y;
		var angle = Math.atan(ycomp/xcomp)*180/Math.PI;
		balls[i].vx = Math.cos(angle);
		balls[i].vy = Math.sin(angle);
		console.log(angle);
		//console.log(balls[i].vx );

		balls[i].x += speed*balls[i].vx;
		balls[i].y += speed*balls[i].vy;
	}

 }
function animate(lastUpdateTime){
	var time = new Date().getTime();
	var deltaTime = time - lastUpdateTime;
	calcMove(deltaTime);
	lastUpdateTime = time;
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < balls.length; i++){
		context.beginPath();
		context.globalAlpha = 1;
		context.arc(balls[i].x,canvas.height-balls[i].y,balls[i].radius,0,2*Math.PI,true);
		context.fillStyle = '#FFFFFF';
		context.closePath();
		context.fill();
	}
	requestAnimFrame(function() {
    animate(lastUpdateTime);
  	});

}
function newTarget(){
	//this.x = Math.round(Math.random()*canvas.width);
	//this.y = Math.round(Math.random()*canvas.height);



	this.x = 0;
	this.y= 300;
}


function Ball(x, y, radius) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.target = new newTarget();
}

