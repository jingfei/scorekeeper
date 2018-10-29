import { Component, OnChanges, Input, SimpleChanges, OnInit, ElementRef } from '@angular/core';
import { BridgeService } from '../bridge.service';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() locations: number[];
  @Input() showGloves: boolean;
  @Input() showRunners: boolean;

  dragTarget: number = 0;
  dragOffset = { x: 0, y: 0 };
  fielders = [{},
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }];

  runners = [
    { isOnBase: false, x: 0, y: 0, isScoring: false },
    { isOnBase: false, x: 0, y: 0, isScoring: false },
    { isOnBase: false, x: 0, y: 0, isScoring: false },
    { isOnBase: false, x: 0, y: 0, isScoring: false }];

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
  
  constructor(public element: ElementRef, private bridgeService: BridgeService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.graphWidth = this.element.nativeElement.getBoundingClientRect().width;
    this.graphHeight = window.innerHeight - 50;
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

    this.initFielders();
    for (var i = 0; i < this.runners.length; ++i) {
      var { x, y } = this.getRunnerXY(i);
      this.runners[i].x = x;
      this.runners[i].y = y;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.locations) {
      if (changes.locations.firstChange) {
        this.updateRunners(this.locations);
      } else {
        this.locations = changes.locations.currentValue;
        this.run(changes.locations.previousValue);
      }
    } else if (changes.showGloves) {
      if (changes.showGloves.currentValue !== changes.showGloves.previousValue) {
        this.initFielders();
      }
    }
  }

  updateRunners(locs: number[] = this.locations) {
    for (var i = 0; i < this.runners.length; ++i) {
      if (locs[i] > -1) {
        this.runners[i].isOnBase = true;
      }
    }
  }

  run(locs: number[]) {
    var speed = 10;
    var goList = [];
    for (var base: number = 3; base >= 0; --base) {
      if (this.runners[base].isOnBase && locs[base] > base) {
        goList.push({ from: base, to: (base + 1) % 4 });

        if (base + 1 < 4) {
          locs[base + 1] = locs[base];
        }
        locs[base] = -1;

        if (locs[base] > 3) { // scoring runner
          this.runners[base].isScoring = true;
        }
      }
    }
    var isCalled = false;
  	var go = setInterval(() => {
      goList.forEach(v => {
        var { from, to } = v;
        var { x: toX, y: toY } = this.getRunnerXY(to);
        var dir = this.bases[from].dir;
        this.runners[from].x += dir[0] * speed;
  		  this.runners[from].y += dir[1] * speed;
  		  if(dir[0]*(this.runners[from].x - toX) > 0 || dir[1]*(this.runners[from].y - toY) > 0) {
          this.runners[from].x = toX;
          this.runners[from].y = toY;

          if (!isCalled) {
            isCalled = true;
            clearInterval(go);
            this.initRunners();
            if (!locs.slice(1).equals(this.locations.slice(1))) {
              this.updateRunners(locs);
              this.run(locs);
            } else {
              // callback
              this.updateRunners(this.locations);
            }
          }
  		  }
      });
  	}, 10);
  }

  initFielders() {
    this.fielders[1] = { x: this.centerX, y: this.centerY - this.pitcherDis - this.pitcherR * 0.5 }; 
    this.fielders[2] = { x: this.centerX, y: this.centerY };
    this.fielders[3] = { x: this.centerX + this.fieldEdge - this.edge * 0.1, y: this.centerY - this.fieldEdge - this.edge * 0.35 };
    this.fielders[4] = { x: this.centerX + this.edge * 0.25, y: this.centerY - this.fieldEdge * 2 - this.baseWidth * 0.5 };
    this.fielders[5] = { x: this.centerX - this.fieldEdge, y: this.centerY - this.fieldEdge - this.edge * 0.35 };
    this.fielders[6] = { x: this.centerX - this.edge * 0.35, y: this.centerY - this.fieldEdge * 2 - this.baseWidth * 0.5 };
    this.fielders[7] = { x: this.centerX - this.edge, y: this.centerY - this.fieldEdge * 2.5 };
    this.fielders[8] = { x: this.centerX - 9, y: this.centerY  - this.fieldEdge * 3 };
    this.fielders[9] = { x: this.centerX + this.edge - 9, y: this.centerY - this.fieldEdge * 2.5 };
  }

  initRunners() {
    for (var i: number = 0; i < this.runners.length; ++i) {
      this.runners[i] = Object.assign({ isOnBase: false, isScoring: false }, this.getRunnerXY(i));
    }
  }

  getRunnerXY(runner: number) {
    return { x: this.bases[runner].x - this.baseWidth * 2, 
             y: this.bases[runner].y - this.baseWidth * 2 };
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

  startDrag(e: MouseEvent) {
    var target = e.currentTarget as HTMLElement;
    if (this.showGloves && target.classList.contains('fielder')) {
      this.dragTarget = parseInt(target.id.substring(8));
      this.dragOffset = this.getMousePosition(e);
      this.dragOffset.x -= this.fielders[this.dragTarget].x;
      this.dragOffset.y -= this.fielders[this.dragTarget].y;
    }
  }

  drag(e: MouseEvent) {
    if (this.dragTarget) {
      e.preventDefault();
      var { x: dragX, y: dragY } = this.getMousePosition(e);
      this.fielders[this.dragTarget].x = dragX - this.dragOffset.x;
      this.fielders[this.dragTarget].y = dragY - this.dragOffset.y;
    }
  }

  endDrag(e: Event) {
    if (this.dragTarget) {
      this.bridgeService.fielderPositionSource.next(this.dragTarget);
      this.dragTarget = 0;
    }
  }

  getMousePosition(e) {
    var CTM = this.element.nativeElement.querySelector('svg').getScreenCTM();
    if (e.touches) {
      e = e.touches[0];
    }
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  }
}
