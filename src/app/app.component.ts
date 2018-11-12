import { ActionDataService } from './action-data.service';
import { FieldActionService } from './field-action.service';
import { TextIconService } from './text-icon.service';
import { BridgeService } from './bridge.service';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Pitch } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';

interface TransitionEvent extends Event {
  pseudoElement: string
}

enum Const {
  BUTTON = 'button',
  LABEL = 'label',
  ACTIVE = 'active',
  FILL = 'fill',
  OUTLINE = 'outline',
  TAB = 'tab-',
  DEFAULT_MAIN_MENU = 'main-pitch',
  MAIN_MENU_PITCH = 'main-pitch',
  MAIN_MENU_RUNNER = 'main-runner',
  MAIN_MENU_CHANGE = 'main-change',
  DEFAULT_HIT_MENU = 'hit-result',
  HIT_MENU_RESULT = 'hit-result',
  HIT_MENU_FIELDERS = 'hit-fielders',
  HIT_MENU_KIND = 'hit-kind',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ActionDataService, TextIconService, BridgeService],
  animations: [
    trigger('animationTabMenu', [
      state('true', style({ display: '*', opacity: 1 })),
      state('false', style({ display: 'none', opacity: 0 })),
      transition('false => true', animate(200))
    ])
  ]
})
export class AppComponent {
  Const = Const;
  HitKind = HitKind;
  HitResult = HitResult;

  historyOpen = false;
  selectedMenu: string = Const.DEFAULT_MAIN_MENU;
  batter = new Batter();
  fielders = new Fielders();
  fieldActionService: FieldActionService;
  subscription: Subscription;

  constructor(private sanitizer: DomSanitizer,
      private actionDataService: ActionDataService,
      private textIconService: TextIconService,
      private bridgeService: BridgeService) {
        this.fieldActionService = new FieldActionService(this.actionDataService, bridgeService.runnerUpdateSource);
        this.subscription = bridgeService.fielderPosition$.subscribe(this.afterFieldersMove.bind(this));
  }

  afterFieldersMove(n: number) {
    if (this.selectedMenu.includes('hit-')) {
      this.fielders.add(n);
    }
  }

  getPitchIconHtml(id: string | number) {
    var pitch = typeof id === "number" ? id : Pitch[id];
    return this.sanitizer.bypassSecurityTrustHtml(this.textIconService.getPitchIconHtml(pitch));
  }

  resetFielders() {
    this.fielders.clear();
  }


  getHitKindIconPath(id: HitKind) {
    return this.textIconService.hitKindPath[id];
  }

  pitchTrigger(e: Event) {
    var target = e.target as HTMLInputElement;
    if(target.tagName === Const.BUTTON.toUpperCase()) {
      target.disabled = true;
      var pitch = Pitch[target.dataset.pitch];
      if (pitch === Pitch.InPlay) {
        target.disabled = false;
        this.updateTab(Const.DEFAULT_HIT_MENU);
      }
      this.fieldActionService.proceedPitch(Pitch[target.dataset.pitch]);
    }
  }

  btnTransitionEnd(e: TransitionEvent) {
    if (e.pseudoElement === "::after") {
      var target = e.target as HTMLInputElement;
      target.disabled = false;
    }
  }

  hitTrigger(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === Const.LABEL.toUpperCase()) {
      var currentTarget = e.currentTarget as HTMLElement;
      if (currentTarget.id === Const.HIT_MENU_KIND) {
        this.batter.kind = HitKind[target.dataset.hitKind];
      } else if (currentTarget.id === Const.HIT_MENU_RESULT) {
        this.batter.result = HitResult[target.dataset.hitRes];
      }
    }
  }

  getPitch(kind: string) {
    var cnt = this.fieldActionService.getCurrentPitchCount(Pitch[kind]);
    var res: string[] = [];

    while(cnt--) {
      res.push(Const.FILL);
    }

    if (Pitch[kind] === Pitch.Strike) {
      while(res.length < 2) {
        res.push(Const.OUTLINE);
      }
    } else if (Pitch[kind] === Pitch.Ball) {
      while(res.length < 3) {
        res.push(Const.OUTLINE);
      }
    }
    return res;
  }

  nextBatter() {
    this.updateTab(Const.DEFAULT_MAIN_MENU);
    this.fieldActionService.proceedBatting(this.batter, this.fielders);
    this.batter.result = this.batter.kind = null;
    this.fielders.clear();
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

  changeTabMenu(e: Event) {
    var target = e.target as HTMLElement;
    if (target.tagName === Const.BUTTON.toUpperCase() && !target.classList.contains(Const.ACTIVE) && target.id.includes(Const.TAB)) {
      this.updateTab(target.id.substring(4));
    }
  }

  updateTab(menu: string) {
    this.selectedMenu = menu;
    this.fieldGraphUpdate(menu);
  }

  fieldGraphUpdate(menu: string) {
    var showGloves, showRunners, showBatter;
    var isResetFielders = false;
    if (menu === Const.HIT_MENU_FIELDERS) {
      showGloves = true;
      showRunners = false;
      showBatter = false;
    } else if (menu === Const.MAIN_MENU_RUNNER) {
      showGloves = false;
      showRunners = true;
      showBatter = false;
    } else if (menu === Const.MAIN_MENU_CHANGE) {
      showGloves = true;
      showRunners = true;
      showBatter = true;
    } else if (menu.includes('main-')) {
      showGloves = false;
      isResetFielders = true;
      showRunners = true;
      showBatter = true;
    }
    this.bridgeService.fieldDisplaySource.next({
      'isShowFielders': showGloves,
      'isShowRunners': showRunners,
      'isShowBatter': showBatter,
      'isResetFielders': isResetFielders
    });
  }

  hasRunnerOnBase(): boolean {
    for (var i: number = 1; i < 4; ++i) {
      if (this.fieldActionService.runners.location[i] > -1) {
        return true;
      }
    }
    return false;
  }
}
