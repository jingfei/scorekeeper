var field = (function(graph) {
  const redMud = '#E41010', grass = '#50A160';

  var dynamicWidth = function() {
  	var width = window.innerWidth
  				|| document.documentElement.clientWidth
  				|| document.body.clientWidth,
  		  height = window.innerHeight
  				|| document.documentElement.clientHeight
  				|| document.body.clientHeight,
  		  svg = document.querySelector('svg#field'),
  		  w = svg.clientWidth,
  		  edge = w < height ? w : height;
  	svg.setAttribute('height', edge);
  	svg.style.width = edge + 'px';
  	svg.setAttribute('width', edge);
  	buildField(svg, edge/2.5, edge*.5 - 10, edge*.9);
  	/*
  	if(width < 768) buildField(svg,edge/3, edge*.5, height*.5);			// xs
  	else if(width < 992) buildField(svg, edge/5, edge*.5, height*.8);		// sm
  	else buildField(svg,edge/10, edge*.5, height*.8);
  	*/
  };

  var buildField = function(svg, edge, centerX, centerY) {
  	const pitcherR = edge * .1875 * .5, pitcherDis = edge * .675, 
  		  baseR = edge * .15, fieldEdge = edge / Math.sqrt(2),
  		  lineGap = edge * .0375, baseWidth = edge * .05,
  		  sDiamondMove = lineGap * Math.sqrt(2), sDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) - lineGap) / Math.sqrt(2),
  		  lDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) + lineGap) / Math.sqrt(2);
  	svg.innerHTML = graph.glove + graph.helmet + `
  		<path id="allField"
  			  d="M${centerX}, ${centerY + sDiamondAway * 2}
  				 L${centerX-edge*3}, ${centerY + sDiamondAway * 2 -edge*3}
  				 L${centerX+edge*3}, ${centerY + sDiamondAway * 2 -edge*3} Z" fill="${grass}" />
  		<path id="redDiamond"
  			  d="${graph.describeArc(centerX,centerY-pitcherDis,edge,-76,76)}
  				 L${centerX - lDiamondAway}, ${centerY + sDiamondMove - lDiamondAway}
  				 ${graph.describeArc(centerX,centerY,baseR,60,300,true)} Z" fill="${redMud}" />
  		<line id="left-line" x1="${centerX}" y1="${centerY}" x2="${centerX-edge*3}" y2="${centerY-edge*3}"/>
  		<line id="right-line" x1="${centerX}" y1="${centerY}" x2="${centerX+edge*3}" y2="${centerY-edge*3}"/>
  		<path id="infield"
  			  d="M${centerX - sDiamondAway}, ${centerY - sDiamondMove - sDiamondAway} 
  				 L${centerX - fieldEdge + sDiamondMove + sDiamondAway}, ${centerY - fieldEdge + sDiamondAway} 
  				 ${graph.describeArc(centerX - fieldEdge,centerY - fieldEdge,baseR,60,120,true)} 
  				 L${centerX - sDiamondAway}, ${centerY - fieldEdge*2 + sDiamondMove + sDiamondAway} 
  				 ${graph.describeArc(centerX,centerY - fieldEdge * 2,baseR,150,-150,true)}  
  				 L${centerX + fieldEdge - sDiamondMove - sDiamondAway}, ${centerY - fieldEdge - sDiamondAway} 
  				 ${graph.describeArc(centerX + fieldEdge,centerY - fieldEdge,baseR,-120,-60,true)} 
  				 L${centerX + sDiamondAway}, ${centerY - sDiamondMove - sDiamondAway} 
  				 ${graph.describeArc(centerX,centerY,baseR,-30,30,true)} Z" fill="${grass}" />
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
        <use xlink:href="#glove" x="${centerX - edge}" y="${centerY - fieldEdge * 2.5}" />
        <text x="${centerX - edge + 5}" y="${centerY-fieldEdge*2.5+20}" fill="white">7</text>
  			<use xlink:href="#glove" x="${centerX - 9}" y="${centerY - fieldEdge * 3}" />
        <text x="${centerX - 9 + 5}" y="${centerY-fieldEdge*3+20}" fill="white">8</text>
  			<use xlink:href="#glove" x="${centerX + edge - 9}" y="${centerY - fieldEdge * 2.5}" />
        <text x="${centerX + edge - 9 + 5}" y="${centerY-fieldEdge*2.5+20}" fill="white">9</text>
  			<use xlink:href="#glove" x="${centerX - fieldEdge}" y="${centerY - fieldEdge - edge*.35}" />
        <text x="${centerX - fieldEdge + 5}" y="${centerY-fieldEdge-edge*.35+20}" fill="white">6</text>
  			<use xlink:href="#glove" x="${centerX - edge*.35}" y="${centerY - fieldEdge * 2 - baseWidth * .5}" />
        <text x="${centerX - edge*.35 + 5}" y="${centerY-fieldEdge*2-baseWidth*.5+20}" fill="white">5</text>
  			<use xlink:href="#glove" x="${centerX + edge*.25}" y="${centerY - fieldEdge * 2 - baseWidth * .5}" />
        <text x="${centerX + edge*.25 + 5}" y="${centerY-fieldEdge*2-baseWidth*.5+20}" fill="white">4</text>
  			<use xlink:href="#glove" x="${centerX + fieldEdge - edge*.1}" y="${centerY - fieldEdge - edge*.35}" />
        <text x="${centerX + fieldEdge - edge*.1 + 5}" y="${centerY-fieldEdge-edge*.35+20}" fill="white">3</text>
  			<use xlink:href="#glove" x="${centerX - 9}" y="${centerY}" />
        <text x="${centerX - 9 + 5}" y="${centerY+20}" fill="white">2</text>
  			<use xlink:href="#glove" x="${centerX - 9}" y="${centerY - pitcherDis - pitcherR * .5}" />
        <text x="${centerX - 9 + 5}" y="${centerY-pitcherDis-pitcherR*.5+20}" fill="white">1</text>
  		</g>
  		<g id="runner">
        <use xlink:href="#helmet" x="${centerX-9}" y="${centerY-25}" id="currentRunner" />
  		</g>`;
  	document.querySelector('#currentRunner').addEventListener("click", (e) => {
  		const runnerBase = [{x: centerX - 9, y: centerY - 25, dir: [1,-1]}, 
  							{x: centerX - 9 + fieldEdge, y: centerY - 25 - fieldEdge, dir: [-1,-1]}, 
  							{x: centerX - 9, y: centerY - 25 - fieldEdge * 2, dir: [-1,1]}, 
  							{x: centerX - 9 - fieldEdge, y: centerY - 25 - fieldEdge, dir: [1,1]} ];
  		const getXY = () => ({ x: parseInt(e.target.getAttribute('x')), y: parseInt(e.target.getAttribute('y')) });
  		runnerBase.map( (r,i) => {
  			const t = getXY();
  			if(t.x == parseInt(r.x) && t.y == parseInt(r.y)) {
  				const {x: toX, y: toY} = runnerBase[(i+1) % runnerBase.length];
  				var go = setInterval(() => {
  					const {x, y} = getXY();
  					e.target.setAttribute('x',x+r.dir[0]);
  					e.target.setAttribute('y',y+r.dir[1]);
  					if(r.dir[0]*(x - toX) > 0 || r.dir[1]*(y - toY) > 0) {
  						e.target.setAttribute('x',toX);
  						e.target.setAttribute('y',toY);
  						clearInterval(go);
  					}
  				}, 5);
  			}
  		});
  	}, false);
  };

  return {
    init: dynamicWidth,
    build: buildField,
    adjustWidth: dynamicWidth
  };
})(graph);
