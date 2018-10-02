/*
Philippe MEYER 
DATE : 2018-10-02
*/

var globals = {
	mainHeight : 480,
	mainWidth : 480,
	baseW : 400,
	baseH: 440, 
	mode : "P2D"
};



function setup() {
    var mode = (globals.mode == "WEBGL") ? WEBGL : P2D;
	var cnv = createCanvas(globals.mainWidth,globals.mainHeight,mode);
    cnv.parent('canvasZone');
	noLoop();

}


function draw() {
	translate(width / 2, height / 2);
	background(255);
	stroke(0);
	noFill();
	strokeWeight(5);
	var w = globals.baseW / 2;
	var h = globals.baseH / 4;
	var delta = globals.baseW / 8;
	var top = h;
	var delta2 = delta / 8;
	var centralRadius = globals.baseW / 6;
	var controlPoint1 = {x:-w/2 + delta ,y:-top - delta};
	var controlPoint2 = {x:w/2 - delta,y:-top - delta};
	var firstLinePtrA = {x:-w/2,y:-top};
	var firstLinePtrB = {x:w/2,y:-top};
	curve(controlPoint1.x, controlPoint1.y, firstLinePtrA.x, firstLinePtrA.y, firstLinePtrB.x, firstLinePtrB.y, controlPoint2.x, controlPoint2.y);

	arc(w/2+delta2-5,w-delta2-2,w+h-delta2,w*3,PI+QUARTER_PI-0.08,PI+HALF_PI);
	
	var angle = -1.9;
	push();
	var r = Math.floor(centralRadius/3);
	translate(-9,delta+20);

	rotate(-1);
	strokeWeight(4);
	var a = r ;
	var b = 0.89;
	var x,y;
	for(var i = 0; i <1150;i++){
		r = a*Math.pow(b,angle);
		x = cos(angle)*r;
		y = sin(angle)*r;
		point(x, y)
		angle -= 0.01;
	}
	strokeWeight(4);
	translate(x,y);
	rotate(1);
	line(0,0,-20,0);
	line(-20,0,-29,-2);
	pop();
}


