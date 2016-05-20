var canvas, context;

var balls = [];
init();


function init(){
	balls.push(new Ball(10,10,10));
}

function newTarget(){

}

$(document).ready(function() {
	canvas = document.getElementById("canv");
	context = canvas.getContext("2d");
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
	var speed = 0.005 * deltaTime;
	for(var i = 0; i < balls.length;i++){
		var angle = Math.atan(balls[i].target.y-balls[i].y,balls[i].target.x-balls[i].x);
		balls[i].vx = balls[i].target.x
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
		context.globalAlpha = 0.6;
		context.arc(balls[i].x,balls[i].y,balls[i].radius,0,2*Math.PI,true);
		context.fillStyle = '#FFFFFF';
		context.closePath();
		context.fill();
	}
	requestAnimFrame(function() {
    animate(lastUpdateTime);
  	});

}


function Ball(x, y, radius) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
}

