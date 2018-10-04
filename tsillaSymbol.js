/*
Philippe MEYER 
DATE : 2018-10-02
*/

var globals = {
	mainHeight : 540,
	mainWidth : 480,
	baseW : 400,
	baseH: 480, 
	mode : "P2D",
	baseUnit:100,
	minBaseUnitForColors : 50,
	strokeWeight :10,
	strokeColor :  {r:0,g:0,b:0},
	backgroundColor: {r:255,g:255,b:255},
	fillColors : [
		{r:91,g:206,b:250},
		{r:245,g:169,b:184},
		{r:255,g:255,b:255},
		{r:245,g:169,b:184},
		{r:91,g:206,b:250},
		{r:0,g:0,b:0}
	]
};

function setup() {
    var mode = (globals.mode == "WEBGL") ? WEBGL : P2D;
	var cnv = createCanvas(globals.mainWidth,globals.mainHeight,mode);
    cnv.parent('canvasZone');
	noLoop();

}

function spiral(startAngle,startPoint,angleOffset,nrPoints,a,b,sign,startFct){
	var x,y;
	
	sign = sign || 1;
	if(startFct) startFct();
	push();
	translate(startPoint.x, startPoint.y);

	var angle = startAngle;
	for(var i = 0; i <nrPoints;i++){
		if(i<50) {stroke(255,0,0) } else {stroke(0)}
		r = a*Math.pow(b,angle);
		x = sign*cos(angle)*r;
		y = sign*sin(angle)*r;
		point(x, y);
		angle += angleOffset;
	}

	pop();
}

function spiralOfLength(startAngle,startPoint,angleOffset,maxLengthInLine,a,b,sign,startFct){
	var x,y,prevX,prevY;
	var lastSpiralPoint = {x:0,y:0};
	sign = sign || 1;
	if(startFct) startFct();
	push();
	translate(startPoint.x, startPoint.y);
    var nrPoints = 10000;
	var angle = startAngle;
	var prevX = 0;
	r = a*Math.pow(b,angle);
	prevX = sign*cos(angle)*r;
	prevY = sign*sin(angle)*r;
	for(var i = 1; i < nrPoints;i++){
		r = a*Math.pow(b,angle);
		x = sign*cos(angle)*r;
		y = sign*sin(angle)*r;
		line(prevX,prevY,x,y);
		prevX = x;
		prevY = y;
		angle += angleOffset;
		var len = getLineLength(startPoint.x,startPoint.y,x,y);
		if(len >= maxLengthInLine) {
			i = nrPoints; // get out of the loop
			lastSpiralPoint.x = x;
			lastSpiralPoint.y= y;
			}
	}

	pop();
	return lastSpiralPoint;
}

function getLineLength(x1,y1,x2,y2){
	var diffX = x2 - x1;
	var diffY = y2 - y1;
	return sqrt(diffX*diffX + diffY*diffY);
}

function getStokeWeight(){
	var strokeWht = globals.strokeWeight;
	if (globals.baseUnit  < 100){
		strokeWht = round(globals.baseUnit  / 20);
		if(strokeWht < 1) strokeWht = 1;
	}
	return strokeWht;
}

function draw() {
	translate(width / 2, height / 2);
	background(globals.backgroundColor.r,globals.backgroundColor.g,globals.backgroundColor.b);
	stroke(globals.strokeColor.r,globals.strokeColor.g,globals.strokeColor.b);
	noFill();
	strokeWeight(getStokeWeight());
	var sizeMultiplier = globals.baseUnit / 100;
	var w = globals.baseW * sizeMultiplier / 2;
	var h = globals.baseH * sizeMultiplier / 4;

	var top = h;
	var delta = w / 2;
	
	var deltaTop = top + delta;
	var delta2 = delta / 2;
	var delta4 = delta / 4;
	var delta6= delta / 6;
	var delta8 = delta / 8;
	var delta12 = delta / 12;
	var centralRadius = w / 3 - delta12;
	
	var controlPoint1 = {x:0,y:-deltaTop};
	var controlPoint2 = {x:0,y:-deltaTop};
	var firstLinePtrA = {x:-delta,y:-top};
	var firstLinePtrB = {x:delta,y:-top};
	
	curve(controlPoint1.x, controlPoint1.y, firstLinePtrA.x, firstLinePtrA.y, firstLinePtrB.x, firstLinePtrB.y, controlPoint2.x, controlPoint2.y);
	
    var spiralStartingPoint = {x:-delta12,y:centralRadius};
	
	var len = round(getLineLength(spiralStartingPoint.x,spiralStartingPoint.y,0,0)) + floor(globals.baseUnit / 100);
	
	var lastSpiralPoint = spiralOfLength(-3,spiralStartingPoint,-0.1,delta+len,centralRadius/3, 0.89,1);
		
	lastSpiralPoint.x += spiralStartingPoint.x;
	lastSpiralPoint.y += spiralStartingPoint.y;
	var horizontalCurveStartPoint = spiralStartingPoint;
	horizontalCurveStartPoint.x -= centralRadius/3+delta12;
	var horizontalCurveEndPoint = {x:firstLinePtrB.x, y:firstLinePtrB.y};
	// we invert the control point (only one control point btw)
	curve(-firstLinePtrA.x, -firstLinePtrA.y, spiralStartingPoint.x, spiralStartingPoint.y, firstLinePtrB.x, firstLinePtrB.y, -firstLinePtrA.x, -firstLinePtrA.y);
	if(globals.minBaseUnitForColors <= globals.baseUnit){
		colorIt();
	}
}

function colorIt(){
loadPixels();
var strokeWht = getStokeWeight();
var isBeforeLine = true;
var density = displayDensity();
var lineLength = globals.baseW * density * strokeWht *4;
var modulo = globals.fillColors.length;
  for (var i = 0; i < pixels.length; i+=4) {
	var lineOffset = floor(i / lineLength);
	var offset = lineOffset % modulo;
    var r = pixels[i];
	var g = pixels[i+1];
	var b = pixels[i+2];
	var a = pixels[i+3];
	if(r == globals.strokeColor.r && g == globals.strokeColor.g && b == globals.strokeColor.b  ){
		var colorChange = globals.fillColors[offset];
		pixels[i] = colorChange.r;
		pixels[i+1] = colorChange.g;
		pixels[i+2] = colorChange.b;
		
	}
  }
  updatePixels();
}
