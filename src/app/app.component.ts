import { ActionDataService } from './action-data.service';
import { FieldActionService } from './field-action.service';
import { TextIconService } from './text-icon.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pitch } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';
import { FieldBuilderService } from './field-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ActionDataService, TextIconService]
})

export class AppComponent { // implements OnInit {
  showPitchMenu = true;
  showHitMenu = false;
  fieldActionService = new FieldActionService(this.actionDataService);

  constructor(private sanitizer: DomSanitizer,
      private actionDataService: ActionDataService,
      private textIconService: TextIconService, private fieldBuilderService: FieldBuilderService) { 
  }

  getPitchIconHtml(id: string | number) {
    var pitch = typeof id === "number" ? id : Pitch[id];
    return this.sanitizer.bypassSecurityTrustHtml(this.textIconService.getPitchIconHtml(pitch));
  }

  getHitKindIconPath(id: HitKind) {
    return this.textIconService.hitKindPath[id];
  }

  pitchTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if(target.tagName === 'BUTTON') {
      var pitch = Pitch[target.dataset.pitch];
      this.showHitMenu = pitch === Pitch.InPlay;
      this.showPitchMenu = !this.showHitMenu;
      this.fieldActionService.recordPitch(Pitch[target.dataset.pitch]);
    }
  }

  hitKindTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordHitKind(HitKind[target.dataset.hitKind]);
    }
  }

  hitResultTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordHitResult(HitResult[target.dataset.hitRes]);
    }
  }

  fielderPosTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordFielder(parseInt(target.dataset.pos));
    }
  }

  getActions() {
    return this.actionDataService.actions;
  }

  ngAfterViewInit() {
  	var width = window.innerWidth
  				|| document.documentElement.clientWidth
  				|| document.body.clientWidth,
  		  height = window.innerHeight
  				|| document.documentElement.clientHeight
  				|| document.body.clientHeight,
  		  svg = document.querySelector('svg#field') as HTMLElement,
  		  w = svg.clientWidth,
  		  edge = w < height ? w : height;
  	svg.setAttribute('height', edge + "");
  	svg.style.width = edge + 'px';
  	svg.setAttribute('width', edge + "");
  	this.fieldBuilderService.buildField(svg, edge/2.5, edge*.5 - 10, edge*.9);
  	/*
  	if(width < 768) buildField(svg,edge/3, edge*.5, height*.5);			// xs
  	else if(width < 992) buildField(svg, edge/5, edge*.5, height*.8);		// sm
  	else buildField(svg,edge/10, edge*.5, height*.8);
  	*/
  }
}
