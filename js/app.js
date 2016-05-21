var canvas, context;
var curspeed = 10;
var numberofBalls = 100;

var balls = [];
var targets = [];

class Target{
	constructor(ball){
		this.x = Math.round(Math.random()*canvas.width);
		this.y = Math.round(Math.random()*canvas.height);
		this.i = targets.length;
		targets.push(this);
		var xcomp = this.x-ball.x;
		var ycomp = this.y-ball.y;
		console.log(xcomp);
		console.log(ycomp);
		if((xcomp > 0 && ycomp > 0) || (xcomp < 0 && ycomp > 0)){
			ball.angle = 90-Math.atan(xcomp/ycomp)*180/Math.PI;
		}else{
			ball.angle = 270-Math.atan(xcomp/ycomp)*180/Math.PI;
		}
	
		console.log(ball.angle)
	}
}

class Ball {
	constructor(x,y,radius){
		  this.radius = radius;
		  this.x = x;	
		  this.y = y;
		  this.vx = 0;
		  this.vy = 0;
		  this.angle = 0.0;
		  this.newTarget();
	}
	newTarget(){
		this.target = new Target(this);
	}
	hitTarget(ball){
	 	var dist = distanceFromPoint(this.x,this.y,this.target.x,this.target.y);
	 	if(dist < this.radius){
			return true;
	 	}
	 	return false;
	 }
}

function init(){
	for(var i = 0; i < numberofBalls; i++){
		balls.push(new Ball(Math.random() *canvas.width ,Math.random()*canvas.height ,10));
	}
	
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
	var speed = 0.055 * deltaTime * curspeed ;
	for(var i = 0; i < balls.length;i++){
		// var xcomp = balls[i].target.x-balls[i].x;
		// var ycomp = balls[i].target.y-balls[i].y;
		// var angle = Math.atan(ycomp/xcomp)*180/Math.PI;
		//console.log(balls[i].angle);
		balls[i].vx = Math.cos(balls[i].angle*Math.PI/180);
		balls[i].vy = Math.sin(balls[i].angle*Math.PI/180);


		balls[i].x += speed*balls[i].vx;
		 balls[i].y += speed*balls[i].vy;
		//balls[i].x += balls[i].vx;
		//balls[i].y += balls[i].vy;

			if(balls[i].hitTarget() == true){
	
			for(var j = balls[i].target.i+1; j < targets.length;j++){
				targets[j].i--;
			}
			targets.splice(balls[i].target.i, 1);
			balls[i].newTarget();
		}
		
	}
	

 }
function distanceFromPoint(origx,origy,destx,desty){
	var difx = destx-origx;
	var dify = desty - origy;
	var finaldist = Math.sqrt(Math.pow(difx,2) + Math.pow(dify,2));
	return finaldist;
}
function animate(lastUpdateTime){
	var time = new Date().getTime();
	var deltaTime = time - lastUpdateTime;
	calcMove(deltaTime);
	lastUpdateTime = time;
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < targets.length; i++){
		context.beginPath();
		context.globalAlpha = 1;
		context.arc(targets[i].x,canvas.height-targets[i].y,4,0,2*Math.PI,true);
		context.fillStyle = '#A00000';
		context.closePath();
		context.fill();
	}
	for(var i = 0; i < balls.length; i++){
		context.beginPath();
		context.globalAlpha = 1;
		context.arc(balls[i].x,canvas.height-balls[i].y,balls[i].radius,0,2*Math.PI,true);
		context.fillStyle = '#FFFFFF';
		//context.fillStyle = balls[i].color;
		context.closePath();
		context.fill();
	}
	
	requestAnimFrame(function() {
    animate(lastUpdateTime);
  	});

}
