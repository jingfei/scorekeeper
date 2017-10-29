const redMud = '#E41010', grass = '#50A160';
const hitPosContent = `<div class="btn-group hit-pos" data-toggle="buttons">
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-1" autocomplete="off">1</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-2" autocomplete="off">2</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-3" autocomplete="off">3</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-4" autocomplete="off">4</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-5" autocomplete="off">5</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-6" autocomplete="off">6</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-7" autocomplete="off">7</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-8" autocomplete="off">8</label>
			  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-9" autocomplete="off">9</label>
			  <button class="btn btn-default minus" style="font-weight:bold">-</button>
			  <button class="btn btn-default" style="font-weight:bold">+</button>
			</div>`;
let currentPitch = [], hitResult = [0,[' '],0];

(function() {
	dynamicWidth();
})();

window.onresize = function(event) { dynamicWidth(); };

[...document.querySelectorAll('#pitch > button')].map(e => e.addEventListener('click', recordPitch, false));
document.querySelector("#hit-kind").addEventListener('click', hitKindTrigger, false);
document.querySelector("#hit-result").addEventListener('click', hitResultTrigger, false);

function dynamicWidth() {
	const width = window.innerWidth
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
}

function buildField(svg, edge, centerX, centerY) {
	const pitcherR = edge * .1875 * .5, pitcherDis = edge * .675, 
		  baseR = edge * .15, fieldEdge = edge / Math.sqrt(2),
		  lineGap = edge * .0375, baseWidth = edge * .05,
		  sDiamondMove = lineGap * Math.sqrt(2), sDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) - lineGap) / Math.sqrt(2),
		  lDiamondAway = (Math.sqrt(baseR*baseR - lineGap*lineGap) + lineGap) / Math.sqrt(2);
	svg.innerHTML = glove + helmet + `
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

function recordPitch(e) {
	const target = e.currentTarget;
	if(target.tagName !== 'BUTTON') return;
	const icon = target.querySelector('.symb');
	const record = document.querySelector('#r-pitch');
	record.innerHTML += icon.outerHTML + ' ';
	currentPitch.push(target.id);
	checkPitch();
}

function deletePitch() {
	const record = document.querySelector('#r-pitch');
	const icon = record.querySelector('.symb:last-of-type');
	if(icon) { record.removeChild(icon); currentPitch.pop(); }
}

function checkPitch() {
	let ans = false;
	if(currentPitch.includes('o')) { // hit
		alert('In play!');
		document.querySelector('#pitch').classList.add('none');
    document.querySelector('#hit').classList.remove('none');
		document.querySelector('#hit-pos-container').innerHTML += hitPosContent;
		document.querySelector('.hit-pos:last-of-type').id = "hit-pos-0";
		document.querySelector('.hit-pos:last-of-type').addEventListener('click', hitPosTrigger, false);
	}
  else if(currentPitch.last() === 'd') {
    hitResult[2] = 'D';
    ans = confirm('觸身球，進入下一個打席？');
  }
	else if(currentPitch.count('b')  === 4) {
    hitResult[2] = 'BB';
		ans = confirm('保送，進入下一個打席?');
  }
	else if( (currentPitch.last() === 's' || currentPitch.last() === 'w') 
        && currentPitch.count('s') + currentPitch.count('w') + currentPitch.count('f') >= 3) {
    hitResult[2] = 'K';
		ans = confirm('三振出局，進入下一個打席?');
  }
	
	if(ans) addHistory();
}

function addHistory() {
	currentPitch = [];
	const content = document.querySelector('#r-pitch').innerHTML;
	const history = document.querySelector('#history');
	history.innerHTML = `<button class="list-group-item">
    <div>${content}</div>
    <div id="h-hit">${hitResult[2] ? hitResult[2] : ''}</div>
    <div id="h-field">${getFieldRecord()}</div></button>` + history.innerHTML;
  [...document.querySelectorAll("[id^='r-']")].map(e => e.innerHTML = '');
  [...document.querySelectorAll("#hit .active")].map(e => e.classList.remove('active'));
  document.querySelector('#hit').classList.add('none');
  document.querySelector("#hit-pos-container").innerHTML = "";
  document.querySelector('#pitch').classList.remove('none');
  hitResult = [0,[' '],0];
}

function hitPosTrigger(e) {
	if(e.target.tagName !== "LABEL" && e.target.tagName !== "BUTTON") return;
  if(e.target.tagName === "LABEL") {
    const act = e.currentTarget.querySelector(".active");
    if(act) act.classList.remove("active");
    e.target.classList.add("active");
  }

	if(e.target.innerText == "-") {
		e.currentTarget.parentElement.removeChild(e.currentTarget);
    hitResult[1].pop();
	} else {
    const len = hitResult[1].length;
    for(let i=0; i<len; ++i) {
      const elm = document.querySelector('#hit-pos-'+i+' .active');
      hitResult[1][i] = elm ? elm.innerText : ' ';
    }
    if(e.target.innerText == "+") {
      const div = document.createElement('div'); 
      div.innerHTML = hitPosContent;
	    document.querySelector('#hit-pos-container').appendChild(div.querySelector('div'));
	    document.querySelector('.hit-pos:last-of-type').id = "hit-pos-" + len;
	    document.querySelector('.hit-pos:last-of-type').addEventListener('click', hitPosTrigger, false);
      hitResult[1].push(0);
    }

    changeHit();
	}
}

function hitKindTrigger(e) {
	if(e.target.tagName !== "LABEL") return;
  hitResult[0] = e.target.id;
  changeHit();
}

function hitResultTrigger(e) {
	if(e.target.tagName !== "LABEL") return;
  hitResult[2] = e.target.id;
  changeHit();
}

function getFieldRecord() {
  const hitKindDraw = {'g': 'M 0 16 A 18 18 0 0 0 20 16',
                       'h': 'M 0 4 L 20 4',
                       'f': 'M 20 8 A 18 18 0 0 0 0 8' };
  const len = hitResult[1].length;
  return `<svg width="${len*20}" height="20">`
        + (hitResult[0] ? `<path stroke="black" fill="none" d="${hitKindDraw[hitResult[0]]}"/>` : '') 
        + hitResult[1].map( (n,i) => (n ? `<text x="${i*20+(i ? 3 : 6)}" y="16" style="font-size:14px" fill="black">${i ? '-' : ''} ${n}</text>` : ''));
        + `</svg>`;
}

function changeHit() {
  const res = document.querySelector("#record");
  res.querySelector('#r-hit').innerHTML = hitResult[2] ? hitResult[2] : '';
  res.querySelector('#r-field').innerHTML = getFieldRecord();
}

Object.defineProperties(Array.prototype, {
  count: {
    value: function(query) {
      let count = 0;
      for(let i=0; i<this.length; i++)
        if(typeof this[i] == 'object') count += this[i].count(query);
        else if (this[i]==query) ++count;
      return count;
    }
  },
  last: {
	  value: function() { return this[this.length - 1]; }
  }
});

