"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function dynamicWidth(){var t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,e=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,i=document.querySelector("svg");i.setAttribute("width",t),i.setAttribute("height",e),t<768?buildField(i,t/4,.5*t,.8*e):t<992?buildField(i,t/5,.5*t,.8*e):buildField(i,t/10,.5*t,.8*e)}function buildField(t,e,i,n){var r=.1875*e*.5,s=.675*e,c=.15*e,l=e/Math.sqrt(2),a=.0375*e,d=.05*e,h=a*Math.sqrt(2),g=(Math.sqrt(c*c-a*a)-a)/Math.sqrt(2),o=(Math.sqrt(c*c-a*a)+a)/Math.sqrt(2);t.innerHTML='\n\t\t<path id="allField"\n\t\t\t  d="M'+i+", "+(n+2*g)+"\n\t\t\t\t L"+(i-3*e)+", "+(n+2*g-3*e)+"\n\t\t\t\t L"+(i+3*e)+", "+(n+2*g-3*e)+' Z" fill="'+grass+'" />\n\t\t<path id="redDiamond"\n\t\t\t  d="'+describeArc(i,n-s,e,-76,76)+"\n\t\t\t\t L"+(i-o)+", "+(n+h-o)+"\n\t\t\t\t "+describeArc(i,n,c,60,300,!0)+' Z" fill="'+redMud+'" />\n\t\t<line id="left-line" x1="'+i+'" y1="'+n+'" x2="'+(i-3*e)+'" y2="'+(n-3*e)+'"/>\n\t\t<line id="right-line" x1="'+i+'" y1="'+n+'" x2="'+(i+3*e)+'" y2="'+(n-3*e)+'"/>\n\t\t<path id="infield"\n\t\t\t  d="M'+(i-g)+", "+(n-h-g)+" \n\t\t\t\t L"+(i-l+h+g)+", "+(n-l+g)+" \n\t\t\t\t "+describeArc(i-l,n-l,c,60,120,!0)+" \n\t\t\t\t L"+(i-g)+", "+(n-2*l+h+g)+" \n\t\t\t\t "+describeArc(i,n-2*l,c,150,-150,!0)+"  \n\t\t\t\t L"+(i+l-h-g)+", "+(n-l-g)+" \n\t\t\t\t "+describeArc(i+l,n-l,c,-120,-60,!0)+" \n\t\t\t\t L"+(i+g)+", "+(n-h-g)+" \n\t\t\t\t "+describeArc(i,n,c,-30,30,!0)+' Z" fill="'+grass+'" />\n\t\t<circle id="pitcher" r="'+r+'" cx="'+i+'" cy="'+(n-s)+'" fill="'+redMud+'" />\n\t\t<g id="base">\n\t\t\t<line x1="'+(i-l)+'" y1="'+(n-l)+'" x2="'+i+'" y2="'+(n-2*l)+'" />\n\t\t\t<line x1="'+i+'" y1="'+(n-2*l)+'" x2="'+(i+l)+'" y2="'+(n-l)+'" />\n\t\t\t<rect id="secondBase" class="base" x="'+i+'" y="'+(n-2*l-.5*d)+'" width="'+d+'" height="'+d+'" />\n\t\t\t<rect id="thirdBase" class="base" x="'+(i-l)+'" y="'+(n-l)+'" width="'+d+'" height="'+d+'" />\n\t\t\t<rect id="firstBase" class="base" x="'+(i+l)+'" y="'+(n-l)+'" width="'+d+'" height="'+d+'" />\n\t\t\t<path id="homeBase" class="base" \n\t\t\t\t  d="M'+i+", "+n+"\n\t\t\t\t\t l-"+.5*d+", -"+.5*d+"\n\t\t\t\t\t l0, -"+.5*d+"\n\t\t\t\t\t l"+d+", 0\n\t\t\t\t\t l0, "+.5*d+' Z" />\n\t\t</g>\n\t\t<g id="fielder">\n\t\t\t<foreignObject id="f-7" width="24" height="24" x="'+(i-e)+'" y="'+(n-2.5*l)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-8" width="24" height="24" x="'+(i-9)+'" y="'+(n-3*l)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-9" width="24" height="24" x="'+(i+e-9)+'" y="'+(n-2.5*l)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-6" width="24" height="24" x="'+(i-l)+'" y="'+(n-l-.35*e)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-5" width="24" height="24" x="'+(i-.35*e)+'" y="'+(n-2*l-.5*d)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-4" width="24" height="24" x="'+(i+.25*e)+'" y="'+(n-2*l-.5*d)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-3" width="24" height="24" x="'+(i+l-.1*e)+'" y="'+(n-l-.35*e)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-2" width="24" height="24" x="'+(i-9)+'" y="'+n+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t\t<foreignObject id="f-1" width="24" height="24" x="'+(i-9)+'" y="'+(n-s-.5*r)+'"><i class="glyphicon glyphicon-sunglasses"></i></foreignObject>\n\t\t</g>\n\t\t<g id="runner">\n\t\t\t<foreignObject id="currentRunner" width="24" height="24" x="'+(i-9)+'" y="'+(n-15)+'"><i class="glyphicon glyphicon-user"></i></foreignObject>\n\t\t</g>',document.querySelector("#currentRunner").addEventListener("click",function(t){var e=[{x:i-9,y:n-15,dir:[1,-1]},{x:i-9+l,y:n-15-l,dir:[-1,-1]},{x:i-9,y:n-15-2*l,dir:[-1,1]},{x:i-9-l,y:n-15-l,dir:[1,1]}],r=function(){return{x:parseInt(t.target.parentElement.getAttribute("x")),y:parseInt(t.target.parentElement.getAttribute("y"))}};e.map(function(i,n){var s=r();if(s.x==parseInt(i.x)&&s.y==parseInt(i.y))var c=e[(n+1)%e.length],l=c.x,a=c.y,d=setInterval(function(){var e=r(),n=e.x,s=e.y;t.target.parentElement.setAttribute("x",n+i.dir[0]),t.target.parentElement.setAttribute("y",s+i.dir[1]),(i.dir[0]*(n-l)>0||i.dir[1]*(s-a)>0)&&(t.target.parentElement.setAttribute("x",l),t.target.parentElement.setAttribute("y",a),clearInterval(d))},5)})},!1)}function polarToCartesian(t,e,i,n){var r=(n-90)*Math.PI/180;return{x:t+i*Math.cos(r),y:e+i*Math.sin(r)}}function describeArc(t,e,i,n,r){var s=arguments.length>5&&void 0!==arguments[5]&&arguments[5],c=arguments.length>6&&void 0!==arguments[6]&&arguments[6],l=polarToCartesian(t,e,i,r),a=polarToCartesian(t,e,i,n),d=r-n<=180?"0":"1";if(c)return[l.x,l.y].join(" ");var h=s?[]:["M",l.x,l.y];return h=[].concat(_toConsumableArray(h),["A",i,i,0,d,0,a.x,a.y]).join(" ")}var redMud="#E41010",grass="#50A160";dynamicWidth(),window.onresize=function(t){dynamicWidth()};