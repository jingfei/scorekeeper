import { Component, OnInit, Input } from '@angular/core';
import { ActionDataService } from '../action-data.service';
import { FieldActionService } from '../field-action.service';
import { Subscription } from 'rxjs';
import { Runners } from '../runners';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent { // implements OnInit {
  @Input('locations') locations;
  @Input('lastLocations') lastLocations;

  subscription: Subscription;
  showLastRunners = false;

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
  
  constructor(private actionDataService: ActionDataService) {
    this.subscription = actionDataService.fieldRunner$.subscribe(
      (n: number) => {
        this.showLastRunners = true;
        this.run(n);
    });
  }

  run(totalRun: number = 1, hasRun: number = 0) {
    var fromBase = 0, toBase = 3, speed = 5;
    var getXY = (target) => ({ x: parseInt(target.getAttribute('x')), y: parseInt(target.getAttribute('y')) });
    var goList = [];
    for (var i: number = fromBase; i <= toBase; ++i) {
      var target = document.querySelector("#runner-base-"+i);
      if (target !== null) {
        var {x: toX, y: toY} = this.bases[(i+1+hasRun) % 4];
        var {x: fromX, y: fromY} = this.bases[i];
        toX -= this.baseWidth*2;
        toY -= this.baseWidth*2;
        fromX -= this.baseWidth*2;
        fromY -= this.baseWidth*2;
        var dir = this.bases[(i+hasRun)%4].dir;
        if (i+hasRun < 4) {
          goList.push({target: target, dir: dir, toX: toX, toY: toY, fromX: fromX, fromY: fromY});
        }
      }
    }
    var isCalled = false;
  	var go = setInterval(() => {
      goList.forEach(v => {
        var { target, dir, toX, toY, fromX, fromY } = v;
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
            } else {
              // callback
              this.showLastRunners = false;
              this.initRunners();
            }
          }
  		  }
      });
  	}, 5);
  }

  initRunners() {
    var fromBase = 0, toBase = 3;
    for (var i: number = 0; i <= toBase; ++i) {
      var target = document.querySelector("#runner-base-"+i);
      if (target !== null) {
        var {x, y} = this.bases[i];
        x -= this.baseWidth*2;
        y -= this.baseWidth*2;
  		 target.setAttribute('x',x.toString());
  		 target.setAttribute('y',y.toString());
      }
    }
  }

  hasRunner(runner: number) {
    var newLoc: number[];
    var loc = this.showLastRunners ? this.lastLocations : this.locations;
    if (typeof loc === 'string') {
      newLoc = loc.split(',').map(s => parseInt(s));
    }
    var r = new Runners(null, newLoc);
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
