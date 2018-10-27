import { Component, OnChanges, Input, SimpleChanges, OnInit, ElementRef } from '@angular/core';
import { ActionDataService } from '../action-data.service';
import { FieldActionService } from '../field-action.service';
import { Runners } from '../runners';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() locations: number[];
  currentLocations: number[];

  graphWidth: number;
  graphHeight: number;
  edge: number;
  pitcherR: number;
  pitcherDis: number;
  baseR: number;
  fieldEdge: number;
  lineGap: number;
  baseWidth: number;
  sDiamondMove: number;
  sDiamondAway: number;
  lDiamondAway: number;
  centerX: number;
  centerY: number;
  bases = [ { x: 0, y: 0, dir: [1,-1], rotate: 0 }, 
  				  { x: 0, y: 0, dir: [-1,-1], rotate: 135 }, 
  				  { x: 0, y: 0, dir: [-1,1], rotate: 45 }, 
  				  { x: 0, y: 0, dir: [1,1], rotate: 315 } ];
  
  constructor(public element: ElementRef, private actionDataService: ActionDataService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.graphWidth = this.element.nativeElement.getBoundingClientRect().width;
    this.graphHeight = window.innerHeight;
    this.edge = this.graphWidth/2.5;
    this.pitcherR = this.edge * .1875 * .5;
    this.pitcherDis = this.edge * .675; 
    this.baseR = this.edge * .15;
    this.fieldEdge = this.edge / Math.sqrt(2);
    this.lineGap = this.edge * .0375;
    this.baseWidth = this.edge * .05;
    this.sDiamondMove = this.lineGap * Math.sqrt(2);
    this.sDiamondAway = (Math.sqrt(this.baseR*this.baseR - this.lineGap*this.lineGap) - this.lineGap) / Math.sqrt(2);
    this.lDiamondAway = (Math.sqrt(this.baseR*this.baseR - this.lineGap*this.lineGap) + this.lineGap) / Math.sqrt(2);
    this.centerX = this.graphWidth*.5;
    this.centerY = this.graphHeight - this.sDiamondAway * 3;
    this.bases = [ { x: this.centerX, y: this.centerY, dir: [1,-1], rotate: 0 }, 
    				  { x: this.centerX + this.fieldEdge, y: this.centerY - this.fieldEdge, dir: [-1,-1], rotate: 135 }, 
    				  { x: this.centerX, y: this.centerY - this.fieldEdge * 2, dir: [-1,1], rotate: 45 }, 
    				  { x: this.centerX - this.fieldEdge, y: this.centerY - this.fieldEdge, dir: [1,1], rotate: 315 } ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.locations) {
      if (changes.locations.firstChange) {
        this.currentLocations = this.locations.slice();
      } else {
        this.locations = this.currentLocations;
        this.currentLocations = changes.locations.currentValue;
        this.run(changes.locations.previousValue.slice());
      }
    }
  }

  run(locs: number[]) {
    var speed = 8;
    var getXY = (target) => ({ x: parseInt(target.getAttribute('x')), y: parseInt(target.getAttribute('y')) });
    var goList = [];
    for (var base: number = 3; base >= 0; --base) {
      var target = document.querySelector("#runner-base-"+base);
      if (target !== null && locs[base] > base) {
        var dir = this.bases[base].dir;
        var toBase = (base + 1) % 4;
        target.id = 'runner-base-' + toBase;
        goList.push({target: target, dir: dir, toBase: toBase});

        if (locs[base] > 3) { // scoring runner
          target.setAttribute('fill', 'red');
        }

        if (base + 1 < 4) {
          locs[base + 1] = locs[base];
          locs[base] = -1;
        }
      }
    }
    var isCalled = false;
  	var go = setInterval(() => {
      goList.forEach(v => {
        var { target, dir, toBase } = v;
        var { x, y } = getXY(target);
        var toX = this.getBaseAttrX(toBase);
        var toY = this.getBaseAttrY(toBase);
  		  target.setAttribute('x',(x+dir[0]*speed).toString());
  		  target.setAttribute('y',(y+dir[1]*speed).toString());
  		  if(dir[0]*(x - parseInt(toX)) > 0 || dir[1]*(y - parseInt(toY)) > 0) {
  		  	target.setAttribute('x', toX);
  		  	target.setAttribute('y', toY);

          if (!isCalled) {
            isCalled = true;
            clearInterval(go);
            if (!locs.slice(1).equals(this.currentLocations.slice(1))) {
              this.run(locs)
            } else {
              // callback
              this.initRunners();
              this.locations = this.currentLocations;
            }
          }
  		  }
      });
  	}, 5);
  }

  initRunners() {
    var fromBase = 0, toBase = 3;
    for (var i: number = 0; i <= toBase; ++i) {
      var target = document.querySelector(".runners use[tabindex='" + i + "']");
      if (target !== null) {
        target.id = 'runner-base-' + i;
  		  target.setAttribute('x', this.getBaseAttrX(i));
  		  target.setAttribute('y', this.getBaseAttrY(i));
  		  target.setAttribute('fill', 'blue');
      }
    }
  }

  hasRunner(runner: number) {
    var r = new Runners(null, this.locations);
    return r.hasRunner(runner);
  }

  getBaseAttrX(runner: number) {
    return (this.bases[runner].x - this.baseWidth * 2).toString();
  }
  getBaseAttrY(runner: number) {
    return (this.bases[runner].y - this.baseWidth * 2).toString();
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
