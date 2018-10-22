import { Component, OnInit, Input } from '@angular/core';
import { Runners } from '../runners';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input('locations') locations;

  graphWidth = 500;
  edge = this.graphWidth/2.5;
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
  bases = [ { x: this.centerX, y: this.centerY, dir: [1,-1], rotate: 0 }, 
  				  { x: this.centerX + this.fieldEdge, y: this.centerY - this.fieldEdge, dir: [-1,-1], rotate: 135 }, 
  				  { x: this.centerX, y: this.centerY - this.fieldEdge * 2, dir: [-1,1], rotate: 45 }, 
  				  { x: this.centerX - this.fieldEdge, y: this.centerY - this.fieldEdge, dir: [1,1], rotate: 315 } ];
  
  constructor() { }
  ngOnInit() { }

  run(fromBase: number, toBase: number) {
    // TODO: add animation to runners
    //for (var i: number = fromBase; i <= toBase; ++i) {
  	//  var go = setInterval(() => {
  	//  	const {x, y} = {bases[i].x, bases[i].y};
  	//  	target.setAttribute('x',(x+dir[0]).toString());
  	//  	target.setAttribute('y',(y+dir[1]).toString());
  	//  	if(r.dir[0]*(x - toX) > 0 || r.dir[1]*(y - toY) > 0) {
  	//  		target.setAttribute('x',toX.toString());
  	//  		target.setAttribute('y',toY.toString());
  	//  		clearInterval(go);
  	//  	}
  	//  }, 5);
    //}
  }

  hasRunner(runner: number) {
    if (typeof this.locations === 'string') {
      this.locations = this.locations.split(',').map(s => parseInt(s));
    }
    var r = new Runners(null, this.locations);
    return r.hasRunner(runner);
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
