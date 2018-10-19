import { ActionDataService } from './action-data.service';
import { FieldActionService } from './field-action.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ActionDataService]
})

export class AppComponent { // implements OnInit {
  title = 'scorekeeper';
  fieldActionService = new FieldActionService(this.actionDataService);

  constructor(private sanitizer: DomSanitizer,
      private actionDataService: ActionDataService) { }

  getPitchIconHtml(id: string) {
    return this.sanitizer.bypassSecurityTrustHtml(this.actionDataService.getPitchIconHtml(id));
  }

  getHitKindIconPath(id: string) {
    var path = {'g': 'M 0 16 A 18 18 0 0 0 20 16',
                'h': 'M 0 4 L 20 4',
                'f': 'M 20 8 A 18 18 0 0 0 0 8' };
    return path[id];
  }

  pitchTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if(target.tagName === 'BUTTON') {
      this.fieldActionService.recordPitch(target.id);
    }
  }

  hitKindTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordHitKind(target.id);
    }
  }

  hitResultTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordHitResult(target.id);
    }
  }

  fielderPosTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordFielder(parseInt(target.id));
    }
  }
}
