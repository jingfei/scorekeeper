import { ActionDataService } from './action-data.service';
import { FieldActionService } from './field-action.service';
import { TextIconService } from './text-icon.service';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Pitch } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

interface TransitionEvent extends Event {
  pseudoElement: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ActionDataService, TextIconService],
  animations: [
    trigger('animationHitMenu', [
      transition(':enter', [ 
        style({ opacity: 0 }),
        animate(200) 
      ]),
      state('*', style({ opacity: 1})),
    ])
  ]
})
export class AppComponent { // implements OnInit {
  showPitchMenu = true;
  showHitMenu = false;
  historyOpen = false;
  hitSelectedMenu = 'hit-kind';
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
    var target = e.target as HTMLInputElement;
    if(target.tagName === 'BUTTON') {
      target.disabled = true;
      var pitch = Pitch[target.dataset.pitch];
      this.showHitMenu = pitch === Pitch.InPlay;
      this.showPitchMenu = !this.showHitMenu;
      this.fieldActionService.recordPitch(Pitch[target.dataset.pitch]);
    }
  }

  btnTransitionEnd(e: TransitionEvent) {
    if (e.pseudoElement === "::after") {
      var target = e.target as HTMLInputElement;
      target.disabled = false;
    }
  }

  hitKindTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.changeActiveElm(e.currentTarget as HTMLElement, target);
      this.fieldActionService.recordHitKind(HitKind[target.dataset.hitKind]);
    }
  }

  hitResultTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.changeActiveElm(e.currentTarget as HTMLElement, target);
      this.fieldActionService.recordHitResult(HitResult[target.dataset.hitRes]);
    }
  }

  fielderPosTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      this.fieldActionService.recordFielder(parseInt(target.dataset.pos));
    }
  }

  getPitch(kind: string) {
    var cnt = this.fieldActionService.getCurrentPitchCount(Pitch[kind]);
    var res: string[] = [];

    while(cnt--) {
      res.push('fill');
    }

    if (Pitch[kind] === Pitch.Strike) {
      while(res.length < 2) {
        res.push('outline');
      }
    } else if (Pitch[kind] === Pitch.Ball) {
      while(res.length < 3) {
        res.push('outline');
      }
    }
    return res;
  }

  nextBatter() {
    this.showHitMenu = false;
    this.showPitchMenu = true;
    this.fieldActionService.nextBatter();
  }

  getActions() {
    return this.actionDataService.actions;
  }

  getAdvancedActions() {
    // FIXME: no pick off currently
    var newActions = [];
    var actions = this.actionDataService.actions;
    for (var i = 0; i < actions.length; ++i) {
      if (actions[i].batter.result) {
        var action = Object.assign({pitches: [actions[i].pitch]}, actions[i]);
        var j = i-1;
        while (j >= 0 && !actions[j].batter.result) {
          action.pitches.push(actions[j].pitch);
          --j;
        }
        action.pitches = action.pitches.slice().reverse();
        newActions.push(action);
      }
    }
    return newActions;
  }

  toggleHistory() {
    this.historyOpen = !this.historyOpen;
  }

  changeTabMenu(e: Event, area: string) {
    var target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' && !target.classList.contains('active')) {
      this.changeActiveElm(e.currentTarget as HTMLElement, target);
      this.hitSelectedMenu = target.id.substring(4);
    }
  }

  changeActiveElm(currentTarget: HTMLElement, target: HTMLElement) {
    var active = 'active';
    var activeElm = currentTarget.querySelector('.' + active);
    if (activeElm) {
      activeElm.classList.remove(active);
    }
    target.classList.add(active);
  }
}
