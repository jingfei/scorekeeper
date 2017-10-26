(function() {
	dynamicWidth();
})();

window.onresize = function(event) { dynamicWidth(); };

function dynamicWidth() {
	const width = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth,
		  height = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight,
		  svg = document.querySelector('svg');
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
	buildField(svg,width/10, width*.5, height*.8);
}

function buildField(svg, edge, centerX, centerY) {
	const pitcherR = edge * .1875 * .5, pitcherDis = edge * .675;
	svg.innerHTML = `
	<rect id="square" x="${centerX-edge}" y="${centerY-edge}" width="${edge}" height="${edge}"/>
			<line id="left-line" x1="${centerX}" y1="${centerY}" x2="${centerX-edge*3}" y2="${centerY-edge*3}"/>
			<line id="right-line" x1="${centerX}" y1="${centerY}" x2="${centerX+edge*3}" y2="${centerY-edge*3}"/>
			<circle id="pitcher" r="${pitcherR}" cx="${centerX}" cy="${centerY-pitcherDis}" />
			<path id="arc" d="${describeArc(centerX,centerY-pitcherDis,edge,-73.5,73.5)}">`;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}