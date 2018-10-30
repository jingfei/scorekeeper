import { ActionDataService } from './action-data.service';
import { Injectable } from '@angular/core';
import { Pitch, Action } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

@Injectable({
  providedIn: 'root'
})
export class FieldActionService {
  currentPitch: Pitch[] = [];
  runners: Runners = new Runners();

  constructor(private actionDataService: ActionDataService) { }

  getCurrentPitchCount(pitch: Pitch) {
    switch(pitch) {
      case Pitch.Ball:
        return this.currentPitch.count(Pitch.Ball);
      case Pitch.Strike:
        var cnt = this.currentPitch.count(Pitch.Strike) +
                    this.currentPitch.count(Pitch.Foul) +
                    this.currentPitch.count(Pitch.SwingMiss);
        cnt = cnt > 2 ? 2 : cnt;
        return cnt;
    }
  }

  proceedPitch(pitch: Pitch) {
    this.currentPitch.push(pitch);
    this.checkPitch();
  }

  deleteLastPitch() {
    // TODO: ActionDataService pop
    this.currentPitch.pop();
  }

  proceedBatting(batter: Batter, fielders: Fielders) {
    var action: Action = this.actionDataService.getLastAction();
    action.batter.kind = batter.kind;
    action.batter.result = batter.result;
    // TODO: fielders other argument
    action.fielders.position = fielders.position.slice();

    var n = 0;
    switch(action.batter.result) {
      case HitResult.BB:
      case HitResult.HitByPitch: 
        n = -1; break;
      case HitResult.B1: n = 1; break;
      case HitResult.B2: n = 2; break;
      case HitResult.B3: n = 3; break;
      case HitResult.HR: n = 4; break;
    }
    if (n === -1) {
      this.runners = action.runners;
      this.runners.force();
    } else if (n === 0) {
      action.batter.isOut = true;
      action.fielders.addOut();
    } else {
      this.runners = action.runners;
      this.runners.hit(n);
    }
    this.actionDataService = this.actionDataService.addAction(action);

    this.currentPitch = [];
    this.runners = new Runners(this.runners);
  }

  getNewAction(): Action {
    var newAction: Action = new Action();
    var batter: Batter = new Batter();
    var fielder: Fielders = new Fielders();
    newAction.batter = batter;
    newAction.fielders = fielder;
    newAction.runners = this.runners;
    this.actionDataService = this.actionDataService.addAction(newAction);
    return newAction;
  }

  checkPitch() {
    var action = this.getNewAction();
    action.pitch = this.currentPitch.last();

    if (action.pitch === Pitch.HitByPitch) {
      action.batter.result = HitResult.HitByPitch;
      this.proceedBatting(action.batter, action.fielders);
    } else if (this.currentPitch.count(Pitch.Ball) === 4) {
      action.batter.result = HitResult.BB;
      this.proceedBatting(action.batter, action.fielders);
    } else if ( (action.pitch === Pitch.Strike || action.pitch === Pitch.SwingMiss) &&
        this.currentPitch.count(Pitch.Strike) + this.currentPitch.count(Pitch.SwingMiss) + this.currentPitch.count(Pitch.Foul) >= 3) {
      action.batter.result = action.pitch === Pitch.Strike ? HitResult.K : HitResult.KK;
      this.proceedBatting(action.batter, action.fielders);
    }
  }
}
