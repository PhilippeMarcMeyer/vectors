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
	background(0);
	stroke(255);
	fill(255);
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
	point(controlPoint1.x, controlPoint1.y)
	point(controlPoint2.x, controlPoint2.y)
	//line(firstLinePtrB.x, firstLinePtrB.y,-centralRadius/2,firstLinePtrB.y+w);
	arc(w/2+delta2-5,w-delta2-2,w+h-delta2,w*3,PI+QUARTER_PI+0.08,PI+HALF_PI);
	point(0,delta+delta2);
	arc(0,delta+delta2,centralRadius,centralRadius,0,PI*2);

}

/*

function ellipseLine(dash,weight){
	var nrPoints = dash.len;
	var xDiff = dash.end.x - dash.start.x ;
	var yDiff = dash.end.y - dash.start.y ;
	var len = Math.floor(Math.sqrt(xDiff*xDiff + yDiff*yDiff));
	
	xDiff = xDiff/len;
	yDiff =  yDiff/len;
	
	var x = dash.start.x;
	var y = dash.start.y;
	var extra = dash.round == 0 ? weight : 0;
	
	for(var i = 0; i < nrPoints;i++){
		 y+= yDiff;
		 x+= xDiff;
		ellipse(x,y,weight+extra+1,weight+extra);
		if(extra > 0 && i% 3 == 0) extra--;
	}
	ellipse(dash.end.x,dash.end.y,weight,weight);
}
*/
