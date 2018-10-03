/*
Philippe MEYER 
DATE : 2018-10-02
*/

var globals = {
	mainHeight : 480,
	mainWidth : 480,
	baseW : 400,
	baseH: 440, 
	mode : "P2D",
	baseUnit:10,
	strokeWeight : 5
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
	var x,y;
	var lastSpiralPoint = {x:0,y:0};
	sign = sign || 1;
	if(startFct) startFct();
	push();
	translate(startPoint.x, startPoint.y);
    var nrPoints = 10000;
	var angle = startAngle;
	for(var i = 0; i <nrPoints;i++){
		r = a*Math.pow(b,angle);
		x = sign*cos(angle)*r;
		y = sign*sin(angle)*r;
		point(x, y);
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

function draw() {
	translate(width / 2, height / 2);
	background(255);
	stroke(0);
	noFill();
	var strokeWht = globals.strokeWeight;
	if (globals.baseUnit  < 10){
		strokeWht = round(globals.baseUnit  / 2);
		if(strokeWht < 1) strokeWht = 1;
	}
	strokeWeight(strokeWht);
	var sizeMultiplier = globals.baseUnit / 10;
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
	var len = round(getLineLength(spiralStartingPoint.x,spiralStartingPoint.y,0,0))+1;
	
	var lastSpiralPoint = spiralOfLength(-3,spiralStartingPoint,-0.01,delta+len,centralRadius/3, 0.89,1,function(){
			stroke(0);
		});
		
		lastSpiralPoint.x += spiralStartingPoint.x;
		lastSpiralPoint.y += spiralStartingPoint.y;
		var horizontalCurveStartPoint = spiralStartingPoint;
		horizontalCurveStartPoint.x -= centralRadius/3+delta12;
		var horizontalCurveEndPoint = {x:firstLinePtrB.x, y:firstLinePtrB.y};
		// we invert the control point (only one control point btw)
		curve(-firstLinePtrA.x, -firstLinePtrA.y, spiralStartingPoint.x, spiralStartingPoint.y, firstLinePtrB.x, firstLinePtrB.y, -firstLinePtrA.x, -firstLinePtrA.y);
	

}

