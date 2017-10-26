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
	const pitcherR = edge * .1875 * .5, pitcherDis = edge * .675, 
		  baseR = edge * .15, fieldEdge = edge / Math.sqrt(2),
		  lineGap = edge * .0375,
		  sDiamondMove = lineGap * Math.sqrt(2), sDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) - lineGap) / Math.sqrt(2);
	svg.innerHTML = `
		<rect class="diamond" x="${centerX-edge}" y="${centerY-edge}" width="${edge}" height="${edge}"/>
		<line id="left-line" x1="${centerX}" y1="${centerY}" x2="${centerX-edge*3}" y2="${centerY-edge*3}"/>
		<line id="right-line" x1="${centerX}" y1="${centerY}" x2="${centerX+edge*3}" y2="${centerY-edge*3}"/>
		<circle id="pitcher" r="${pitcherR}" cx="${centerX}" cy="${centerY-pitcherDis}" />
		<path d="${describeArc(centerX,centerY-pitcherDis,edge,-76,76)}" />
		<g id="base">
			<path d="${describeArc(centerX,centerY - fieldEdge * 2,baseR,150,-150)}" />
			<path d="${describeArc(centerX,centerY,baseR,-30,30)}" />
			<path d="${describeArc(centerX - fieldEdge,centerY - fieldEdge,baseR,60,120)}" />
			<path d="${describeArc(centerX + fieldEdge,centerY - fieldEdge,baseR,-120,-60)}" />
		</g>
		<g id="diamond-small">
			<line x1="${centerX - sDiamondAway}" y1="${centerY - sDiamondMove - sDiamondAway}" 
				  x2="${centerX - fieldEdge + sDiamondMove + sDiamondAway}" y2="${centerY - fieldEdge + sDiamondAway}" />
			<line x1="${centerX - fieldEdge + sDiamondMove + sDiamondAway}" y1="${centerY - fieldEdge - sDiamondAway}" 
				  x2="${centerX - sDiamondAway}" y2="${centerY - fieldEdge*2 + sDiamondMove + sDiamondAway}" />
			<line x1="${centerX + sDiamondAway}" y1="${centerY - fieldEdge*2 + sDiamondMove + sDiamondAway}"
				  x2="${centerX + fieldEdge - sDiamondMove - sDiamondAway}" y2="${centerY - fieldEdge - sDiamondAway}" />
			<line x1="${centerX + fieldEdge - sDiamondMove - sDiamondAway}" y1="${centerY - fieldEdge + sDiamondAway}" 
				  x2="${centerX + sDiamondAway}" y2="${centerY - sDiamondMove - sDiamondAway}" />
		</g>
		<g id="foul">
			<line id="left-line" x1="${centerX}" y1="${centerY + sDiamondMove}" x2="${centerX-edge}" y2="${centerY-edge + sDiamondMove}"/>
			<line id="right-line" x1="${centerX}" y1="${centerY + sDiamondMove}" x2="${centerX+edge}" y2="${centerY-edge + sDiamondMove}"/>
		</g>`;
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