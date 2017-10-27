const redMud = '#E41010', grass = '#50A160';

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
	if(width < 768) buildField(svg,width/4, width*.5, height*.8);			// xs
	else if(width < 992) buildField(svg, width/5, width*.5, height*.8);		// sm
	else buildField(svg,width/10, width*.5, height*.8);
}

function buildField(svg, edge, centerX, centerY) {
	const pitcherR = edge * .1875 * .5, pitcherDis = edge * .675, 
		  baseR = edge * .15, fieldEdge = edge / Math.sqrt(2),
		  lineGap = edge * .0375, baseWidth = edge * .05,
		  sDiamondMove = lineGap * Math.sqrt(2), sDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) - lineGap) / Math.sqrt(2),
		  lDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) + lineGap) / Math.sqrt(2);
	svg.innerHTML = `
		<path id="allField"
			  d="M${centerX}, ${centerY + sDiamondAway * 2}
				 L${centerX-edge*3}, ${centerY + sDiamondAway * 2 -edge*3}
				 L${centerX+edge*3}, ${centerY + sDiamondAway * 2 -edge*3} Z" fill="${grass}" />
		<path id="redDiamond"
			  d="${describeArc(centerX,centerY-pitcherDis,edge,-76,76)}
				 L${centerX - lDiamondAway}, ${centerY + sDiamondMove - lDiamondAway}
				 ${describeArc(centerX,centerY,baseR,60,300,true)} Z" fill="${redMud}" />
		<line id="left-line" x1="${centerX}" y1="${centerY}" x2="${centerX-edge*3}" y2="${centerY-edge*3}"/>
		<line id="right-line" x1="${centerX}" y1="${centerY}" x2="${centerX+edge*3}" y2="${centerY-edge*3}"/>
		<path id="infield"
			  d="M${centerX - sDiamondAway}, ${centerY - sDiamondMove - sDiamondAway} 
				 L${centerX - fieldEdge + sDiamondMove + sDiamondAway}, ${centerY - fieldEdge + sDiamondAway} 
				 ${describeArc(centerX - fieldEdge,centerY - fieldEdge,baseR,60,120,true)} 
				 L${centerX - sDiamondAway}, ${centerY - fieldEdge*2 + sDiamondMove + sDiamondAway} 
				 ${describeArc(centerX,centerY - fieldEdge * 2,baseR,150,-150,true)}  
				 L${centerX + fieldEdge - sDiamondMove - sDiamondAway}, ${centerY - fieldEdge - sDiamondAway} 
				 ${describeArc(centerX + fieldEdge,centerY - fieldEdge,baseR,-120,-60,true)} 
				 L${centerX + sDiamondAway}, ${centerY - sDiamondMove - sDiamondAway} 
				 ${describeArc(centerX,centerY,baseR,-30,30,true)} Z" fill="${grass}" />
		<circle id="pitcher" r="${pitcherR}" cx="${centerX}" cy="${centerY-pitcherDis}" fill="${redMud}" />
		<g id="base">
			<line x1="${centerX - fieldEdge}" y1="${centerY - fieldEdge}" x2="${centerX}" y2="${centerY - fieldEdge * 2}" />
			<line x1="${centerX}" y1="${centerY - fieldEdge * 2}" x2="${centerX + fieldEdge}" y2="${centerY - fieldEdge}" />
			<rect id="secondBase" class="base" x="${centerX}" y="${centerY - fieldEdge * 2 - baseWidth * .5}" width="${baseWidth}" height="${baseWidth}" />
			<rect id="thirdBase" class="base" x="${centerX - fieldEdge}" y="${centerY - fieldEdge}" width="${baseWidth}" height="${baseWidth}" />
			<rect id="firstBase" class="base" x="${centerX + fieldEdge}" y="${centerY - fieldEdge}" width="${baseWidth}" height="${baseWidth}" />
			<path id="homeBase" class="base" 
				  d="M${centerX}, ${centerY}
					 l-${baseWidth*.5}, -${baseWidth*.5}
					 l0, -${baseWidth*.5}
					 l${baseWidth}, 0
					 l0, ${baseWidth*.5} Z" />
		</g>
		<g id="fielder">
			<foreignObject id="f-7" width="24" height="24" x="${centerX - edge}" y="${centerY - fieldEdge * 2.5}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-8" width="24" height="24" x="${centerX - 9}" y="${centerY - fieldEdge * 3}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-9" width="24" height="24" x="${centerX + edge - 9}" y="${centerY - fieldEdge * 2.5}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-6" width="24" height="24" x="${centerX - fieldEdge}" y="${centerY - fieldEdge - edge*.35}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-5" width="24" height="24" x="${centerX - edge*.35}" y="${centerY - fieldEdge * 2 - baseWidth * .5}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-4" width="24" height="24" x="${centerX + edge*.25}" y="${centerY - fieldEdge * 2 - baseWidth * .5}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-3" width="24" height="24" x="${centerX + fieldEdge - edge*.1}" y="${centerY - fieldEdge - edge*.35}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-2" width="24" height="24" x="${centerX - 9}" y="${centerY}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
			<foreignObject id="f-1" width="24" height="24" x="${centerX - 9}" y="${centerY - pitcherDis - pitcherR * .5}"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>
		</g>
		<g id="runner">
			<foreignObject id="currentRunner" width="24" height="24" x="${centerX - 9}" y="${centerY - 15}"><i class="glyphicon glyphicon-user"></i></foreignObject>
		</g>`;
	document.querySelector('#currentRunner').addEventListener("click", (e) => {
		const runnerBase = [{x: centerX - 9, y: centerY - 15, dir: [1,-1]}, 
							{x: centerX - 9 + fieldEdge, y: centerY - 15 - fieldEdge, dir: [-1,-1]}, 
							{x: centerX - 9, y: centerY - 15 - fieldEdge * 2, dir: [-1,1]}, 
							{x: centerX - 9 - fieldEdge, y: centerY - 15 - fieldEdge, dir: [1,1]} ];
		const getXY = () => ({ x: parseInt(e.target.parentElement.getAttribute('x')), y: parseInt(e.target.parentElement.getAttribute('y')) });
		runnerBase.map( (r,i) => {
			const t = getXY();
			if(t.x == parseInt(r.x) && t.y == parseInt(r.y)) {
				const {x: toX, y: toY} = runnerBase[(i+1) % runnerBase.length];
				var go = setInterval(() => {
					const {x, y} = getXY();
					e.target.parentElement.setAttribute('x',x+r.dir[0]);
					e.target.parentElement.setAttribute('y',y+r.dir[1]);
					if( r.dir[0]*(x - toX) > 0 || r.dir[1]*(y - toY) > 0) {
						e.target.parentElement.setAttribute('x',toX);
						e.target.parentElement.setAttribute('y',toY);
						clearInterval(go);
					}
				}, 5);
			}
		});
	}, false);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle, noM = false, getM = false){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	
	if(getM) return [start.x, start.y].join(" ");
	
	var d = noM ? [] : ["M", start.x, start.y];
    d = [ ...d, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

    return d;       
}