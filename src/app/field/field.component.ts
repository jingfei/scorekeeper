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

  run(totalRun = 1, hasRun = 0) {
    var fromBase = 0, toBase = 3, speed = 5;
    var getXY = (target) => ({ x: parseInt(target.getAttribute('x')), y: parseInt(target.getAttribute('y')) });
    var goList = [];
    for (var i: number = fromBase; i <= toBase; ++i) {
      var target = document.querySelector("#runner-base-"+i);
      if (target !== null) {
        var {x: toX, y: toY} = this.bases[(i+1+hasRun) % 4];
        toX -= this.baseWidth*2;
        toY -= this.baseWidth*2;
        var dir = this.bases[(i+hasRun)%4].dir;
        if (i+hasRun < 4) {
          goList.push({target: target, dir: dir, toX: toX, toY: toY});
        }
      }
    }
    var isCalled = false;
  	var go = setInterval(() => {
      goList.forEach(v => {
        var { target, dir, toX, toY } = v;
        var { x, y } = getXY(target);
  		  target.setAttribute('x',(x+dir[0]*speed).toString());
  		  target.setAttribute('y',(y+dir[1]*speed).toString());
  		  if(dir[0]*(x - toX) > 0 || dir[1]*(y - toY) > 0) {
  		  	target.setAttribute('x',toX.toString());
  		  	target.setAttribute('y',toY.toString());
          if (!isCalled) {
            isCalled = true;
            clearInterval(go);
            if (totalRun - hasRun > 1) {
              this.run(totalRun, hasRun + 1);
            }
          }
  		  }
      });
  	}, 5);
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
