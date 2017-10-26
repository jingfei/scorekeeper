"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function dynamicWidth(){window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,e=document.querySelector("svg#field"),n=e.clientWidth,i=n<t?n:t;e.setAttribute("height",i),e.style.width=i+"px",e.setAttribute("width",i),buildField(e,i/2.5,.5*i-10,.9*i)}function buildField(t,e,n,i){var r=.1875*e*.5,l=.675*e,o=.15*e,a=e/Math.sqrt(2),c=.0375*e,u=.05*e,s=c*Math.sqrt(2),d=(Math.sqrt(o*o-c*c)-c)/Math.sqrt(2),h=(Math.sqrt(o*o-c*c)+c)/Math.sqrt(2);t.innerHTML=glove+helmet+'\n\t\t<path id="allField"\n\t\t\t  d="M'+n+", "+(i+2*d)+"\n\t\t\t\t L"+(n-3*e)+", "+(i+2*d-3*e)+"\n\t\t\t\t L"+(n+3*e)+", "+(i+2*d-3*e)+' Z" fill="'+grass+'" />\n\t\t<path id="redDiamond"\n\t\t\t  d="'+describeArc(n,i-l,e,-76,76)+"\n\t\t\t\t L"+(n-h)+", "+(i+s-h)+"\n\t\t\t\t "+describeArc(n,i,o,60,300,!0)+' Z" fill="'+redMud+'" />\n\t\t<line id="left-line" x1="'+n+'" y1="'+i+'" x2="'+(n-3*e)+'" y2="'+(i-3*e)+'"/>\n\t\t<line id="right-line" x1="'+n+'" y1="'+i+'" x2="'+(n+3*e)+'" y2="'+(i-3*e)+'"/>\n\t\t<path id="infield"\n\t\t\t  d="M'+(n-d)+", "+(i-s-d)+" \n\t\t\t\t L"+(n-a+s+d)+", "+(i-a+d)+" \n\t\t\t\t "+describeArc(n-a,i-a,o,60,120,!0)+" \n\t\t\t\t L"+(n-d)+", "+(i-2*a+s+d)+" \n\t\t\t\t "+describeArc(n,i-2*a,o,150,-150,!0)+"  \n\t\t\t\t L"+(n+a-s-d)+", "+(i-a-d)+" \n\t\t\t\t "+describeArc(n+a,i-a,o,-120,-60,!0)+" \n\t\t\t\t L"+(n+d)+", "+(i-s-d)+" \n\t\t\t\t "+describeArc(n,i,o,-30,30,!0)+' Z" fill="'+grass+'" />\n\t\t<circle id="pitcher" r="'+r+'" cx="'+n+'" cy="'+(i-l)+'" fill="'+redMud+'" />\n\t\t<g id="base">\n\t\t\t<line x1="'+(n-a)+'" y1="'+(i-a)+'" x2="'+n+'" y2="'+(i-2*a)+'" />\n\t\t\t<line x1="'+n+'" y1="'+(i-2*a)+'" x2="'+(n+a)+'" y2="'+(i-a)+'" />\n\t\t\t<rect id="secondBase" class="base" x="'+n+'" y="'+(i-2*a-.5*u)+'" width="'+u+'" height="'+u+'" />\n\t\t\t<rect id="thirdBase" class="base" x="'+(n-a)+'" y="'+(i-a)+'" width="'+u+'" height="'+u+'" />\n\t\t\t<rect id="firstBase" class="base" x="'+(n+a)+'" y="'+(i-a)+'" width="'+u+'" height="'+u+'" />\n\t\t\t<path id="homeBase" class="base" \n\t\t\t\t  d="M'+n+", "+i+"\n\t\t\t\t\t l-"+.5*u+", -"+.5*u+"\n\t\t\t\t\t l0, -"+.5*u+"\n\t\t\t\t\t l"+u+", 0\n\t\t\t\t\t l0, "+.5*u+' Z" />\n\t\t</g>\n\t\t<g id="fielder">\n      <use xlink:href="#glove" x="'+(n-e)+'" y="'+(i-2.5*a)+'" />\n      <text x="'+(n-e+5)+'" y="'+(i-2.5*a+20)+'" fill="white">7</text>\n\t\t\t<use xlink:href="#glove" x="'+(n-9)+'" y="'+(i-3*a)+'" />\n      <text x="'+(n-9+5)+'" y="'+(i-3*a+20)+'" fill="white">8</text>\n\t\t\t<use xlink:href="#glove" x="'+(n+e-9)+'" y="'+(i-2.5*a)+'" />\n      <text x="'+(n+e-9+5)+'" y="'+(i-2.5*a+20)+'" fill="white">9</text>\n\t\t\t<use xlink:href="#glove" x="'+(n-a)+'" y="'+(i-a-.35*e)+'" />\n      <text x="'+(n-a+5)+'" y="'+(i-a-.35*e+20)+'" fill="white">6</text>\n\t\t\t<use xlink:href="#glove" x="'+(n-.35*e)+'" y="'+(i-2*a-.5*u)+'" />\n      <text x="'+(n-.35*e+5)+'" y="'+(i-2*a-.5*u+20)+'" fill="white">5</text>\n\t\t\t<use xlink:href="#glove" x="'+(n+.25*e)+'" y="'+(i-2*a-.5*u)+'" />\n      <text x="'+(n+.25*e+5)+'" y="'+(i-2*a-.5*u+20)+'" fill="white">4</text>\n\t\t\t<use xlink:href="#glove" x="'+(n+a-.1*e)+'" y="'+(i-a-.35*e)+'" />\n      <text x="'+(n+a-.1*e+5)+'" y="'+(i-a-.35*e+20)+'" fill="white">3</text>\n\t\t\t<use xlink:href="#glove" x="'+(n-9)+'" y="'+i+'" />\n      <text x="'+(n-9+5)+'" y="'+(i+20)+'" fill="white">2</text>\n\t\t\t<use xlink:href="#glove" x="'+(n-9)+'" y="'+(i-l-.5*r)+'" />\n      <text x="'+(n-9+5)+'" y="'+(i-l-.5*r+20)+'" fill="white">1</text>\n\t\t</g>\n\t\t<g id="runner">\n      <use xlink:href="#helmet" x="'+(n-9)+'" y="'+(i-25)+'" id="currentRunner" />\n\t\t</g>',document.querySelector("#currentRunner").addEventListener("click",function(t){var e=[{x:n-9,y:i-25,dir:[1,-1]},{x:n-9+a,y:i-25-a,dir:[-1,-1]},{x:n-9,y:i-25-2*a,dir:[-1,1]},{x:n-9-a,y:i-25-a,dir:[1,1]}],r=function(){return{x:parseInt(t.target.getAttribute("x")),y:parseInt(t.target.getAttribute("y"))}};e.map(function(n,i){var l=r();if(l.x==parseInt(n.x)&&l.y==parseInt(n.y))var o=e[(i+1)%e.length],a=o.x,c=o.y,u=setInterval(function(){var e=r(),i=e.x,l=e.y;t.target.setAttribute("x",i+n.dir[0]),t.target.setAttribute("y",l+n.dir[1]),(n.dir[0]*(i-a)>0||n.dir[1]*(l-c)>0)&&(t.target.setAttribute("x",a),t.target.setAttribute("y",c),clearInterval(u))},5)})},!1)}function polarToCartesian(t,e,n,i){var r=(i-90)*Math.PI/180;return{x:t+n*Math.cos(r),y:e+n*Math.sin(r)}}function describeArc(t,e,n,i,r){var l=arguments.length>5&&void 0!==arguments[5]&&arguments[5],o=arguments.length>6&&void 0!==arguments[6]&&arguments[6],a=polarToCartesian(t,e,n,r),c=polarToCartesian(t,e,n,i),u=r-i<=180?"0":"1";if(o)return[a.x,a.y].join(" ");var s=l?[]:["M",a.x,a.y];return s=[].concat(_toConsumableArray(s),["A",n,n,0,u,0,c.x,c.y]).join(" ")}function recordPitch(t){var e=t.currentTarget;if("BUTTON"===e.tagName){var n=e.querySelector(".symb");document.querySelector("#r-pitch").innerHTML+=n.outerHTML+" ",currentPitch.push(e.id),checkPitch()}}function deletePitch(){var t=document.querySelector("#r-pitch"),e=t.querySelector(".symb:last-of-type");e&&(t.removeChild(e),currentPitch.pop())}function checkPitch(){var t=!1;currentPitch.includes("o")?(alert("In play!"),document.querySelector("#pitch").classList.add("none"),document.querySelector("#hit").classList.remove("none"),document.querySelector("#hit-pos-container").innerHTML+=hitPosContent,document.querySelector(".hit-pos:last-of-type").id="hit-pos-0",document.querySelector(".hit-pos:last-of-type").addEventListener("click",hitPosTrigger,!1)):"d"===currentPitch.last()?(hitResult[2]="D",t=confirm("觸身球，進入下一個打席？")):4===currentPitch.count("b")?(hitResult[2]="BB",t=confirm("保送，進入下一個打席?")):("s"===currentPitch.last()||"w"===currentPitch.last())&&currentPitch.count("s")+currentPitch.count("w")+currentPitch.count("f")>=3&&(hitResult[2]="K",t=confirm("三振出局，進入下一個打席?")),t&&addHistory()}function addHistory(){currentPitch=[];var t=document.querySelector("#r-pitch").innerHTML,e=document.querySelector("#history");e.innerHTML='<button class="list-group-item">\n    <div>'+t+'</div>\n    <div id="h-hit">'+(hitResult[2]?hitResult[2]:"")+'</div>\n    <div id="h-field">'+getFieldRecord()+"</div></button>"+e.innerHTML,[].concat(_toConsumableArray(document.querySelectorAll("[id^='r-']"))).map(function(t){return t.innerHTML=""}),[].concat(_toConsumableArray(document.querySelectorAll("#hit .active"))).map(function(t){return t.classList.remove("active")}),document.querySelector("#hit").classList.add("none"),document.querySelector("#hit-pos-container").innerHTML="",document.querySelector("#pitch").classList.remove("none"),hitResult=[0,[" "],0]}function hitPosTrigger(t){if("LABEL"===t.target.tagName||"BUTTON"===t.target.tagName){if("LABEL"===t.target.tagName){var e=t.currentTarget.querySelector(".active");e&&e.classList.remove("active"),t.target.classList.add("active")}if("-"==t.target.innerText)t.currentTarget.parentElement.removeChild(t.currentTarget),hitResult[1].pop();else{for(var n=hitResult[1].length,i=0;i<n;++i){var r=document.querySelector("#hit-pos-"+i+" .active");hitResult[1][i]=r?r.innerText:" "}if("+"==t.target.innerText){var l=document.createElement("div");l.innerHTML=hitPosContent,document.querySelector("#hit-pos-container").appendChild(l.querySelector("div")),document.querySelector(".hit-pos:last-of-type").id="hit-pos-"+n,document.querySelector(".hit-pos:last-of-type").addEventListener("click",hitPosTrigger,!1),hitResult[1].push(0)}changeHit()}}}function hitKindTrigger(t){"LABEL"===t.target.tagName&&(hitResult[0]=t.target.id,changeHit())}function hitResultTrigger(t){"LABEL"===t.target.tagName&&(hitResult[2]=t.target.id,changeHit())}function getFieldRecord(){return'<svg width="'+20*hitResult[1].length+'" height="20">'+(hitResult[0]?'<path stroke="black" fill="none" d="'+{g:"M 0 16 A 18 18 0 0 0 20 16",h:"M 0 4 L 20 4",f:"M 20 8 A 18 18 0 0 0 0 8"}[hitResult[0]]+'"/>':"")+hitResult[1].map(function(t,e){return t?'<text x="'+(20*e+(e?3:6))+'" y="16" style="font-size:14px" fill="black">'+(e?"-":"")+" "+t+"</text>":""})}function changeHit(){var t=document.querySelector("#record");t.querySelector("#r-hit").innerHTML=hitResult[2]?hitResult[2]:"",t.querySelector("#r-field").innerHTML=getFieldRecord()}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},redMud="#E41010",grass="#50A160",hitPosContent='<div class="btn-group hit-pos" data-toggle="buttons">\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-1" autocomplete="off">1</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-2" autocomplete="off">2</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-3" autocomplete="off">3</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-4" autocomplete="off">4</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-5" autocomplete="off">5</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-6" autocomplete="off">6</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-7" autocomplete="off">7</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-8" autocomplete="off">8</label>\n\t\t\t  <label class="btn btn-default"><input type="radio" name="hit-pos-1" value="f-9" autocomplete="off">9</label>\n\t\t\t  <button class="btn btn-default minus" style="font-weight:bold">-</button>\n\t\t\t  <button class="btn btn-default" style="font-weight:bold">+</button>\n\t\t\t</div>',currentPitch=[],hitResult=[0,[" "],0];dynamicWidth(),window.onresize=function(t){dynamicWidth()},[].concat(_toConsumableArray(document.querySelectorAll("#pitch > button"))).map(function(t){return t.addEventListener("click",recordPitch,!1)}),document.querySelector("#hit-kind").addEventListener("click",hitKindTrigger,!1),document.querySelector("#hit-result").addEventListener("click",hitResultTrigger,!1),Object.defineProperties(Array.prototype,{count:{value:function(t){for(var e=0,n=0;n<this.length;n++)"object"==_typeof(this[n])?e+=this[n].count(t):this[n]==t&&++e;return e}},last:{value:function(){return this[this.length-1]}}});