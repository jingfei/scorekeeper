import { ActionDataService } from './action-data.service';
import { FieldActionService } from './field-action.service';
import { TextIconService } from './text-icon.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pitch } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

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
      private textIconService: TextIconService) { }

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
}
