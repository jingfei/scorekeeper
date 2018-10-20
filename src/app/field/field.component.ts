import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  redMud = '#E41010'; 
  grass = '#50A160';
  edge = 500/2.5;
  pitcherR = this.edge * .1875 * .5;
  pitcherDis = this.edge * .675; 
  baseR = this.edge * .15;
  fieldEdge = this.edge / Math.sqrt(2);
  lineGap = this.edge * .0375;
  baseWidth = this.edge * .05;
  sDiamondMove = this.lineGap * Math.sqrt(2);
  sDiamondAway = (Math.sqrt(this.baseR*this.baseR - this.lineGap*this.lineGap) - this.lineGap) / Math.sqrt(2);
  lDiamondAway = (Math.sqrt(this.baseR*this.baseR - this.lineGap*this.lineGap) + this.lineGap) / Math.sqrt(2);
  centerX = this.edge*2.5*.5 - 10;
  centerY = this.edge*2.5*.9;
  
  constructor() { }
  ngOnInit() { }

  run(e: Event) {
  	var runnerBase = [{x: this.centerX - 9, y: this.centerY - 25, dir: [1,-1]}, 
  						{x: this.centerX - 9 + this.fieldEdge, y: this.centerY - 25 - this.fieldEdge, dir: [-1,-1]}, 
  						{x: this.centerX - 9, y: this.centerY - 25 - this.fieldEdge * 2, dir: [-1,1]}, 
  						{x: this.centerX - 9 - this.fieldEdge, y: this.centerY - 25 - this.fieldEdge, dir: [1,1]} ];
    var target = e.target as HTMLElement;
  	var getXY = () => ({ x: parseInt(target.getAttribute('x')), y: parseInt(target.getAttribute('y')) });
  	runnerBase.map( (r,i) => {
  		const t = getXY();
  		if(t.x == parseInt(r.x.toString()) && t.y == parseInt(r.y.toString())) {
  			const {x: toX, y: toY} = runnerBase[(i+1) % runnerBase.length];
  			var go = setInterval(() => {
  				const {x, y} = getXY();
  				target.setAttribute('x',(x+r.dir[0]).toString());
  				target.setAttribute('y',(y+r.dir[1]).toString());
  				if(r.dir[0]*(x - toX) > 0 || r.dir[1]*(y - toY) > 0) {
  					target.setAttribute('x',toX.toString());
  					target.setAttribute('y',toY.toString());
  					clearInterval(go);
  				}
  			}, 5);
  		}
  	});
  }

  describeArc(x, y, radius, startAngle, endAngle, noM = false, getM = false){
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);
  
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  	
  	if(getM) return [start.x, start.y].join(" ");
  	
  	var d = noM ? [] : ["M", start.x, start.y];
      return [ ...d, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}
