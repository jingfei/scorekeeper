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

  recordPitch(pitch: Pitch) {
    this.currentPitch.push(pitch);
    this.checkPitch();
  }

  deleteLastPitch() {
    // TODO: ActionDataService pop
    this.currentPitch.pop();
  }

  recordHitKind(kind: HitKind) {
    var action: Action = this.actionDataService.getLastAction();
    action.batter.kind = kind;
    this.actionDataService = this.actionDataService.addAction(action);
  }

  recordHitResult(res: HitResult) {
    var action: Action = this.actionDataService.getLastAction();
    action.batter.result = res;
    this.actionDataService = this.actionDataService.addAction(action);
  }

  recordFielder(pos: number, isOut: boolean = false) {
    var action: Action = this.actionDataService.getLastAction();
    action.fielders.add(pos, isOut);
    this.actionDataService = this.actionDataService.addAction(action);
  }

  checkPitch() {
    var action: Action = new Action();
    var batter: Batter = new Batter();
    var fielder: Fielders = new Fielders();
    var isNext = false;

    action.pitch = this.currentPitch.last();

    if (action.pitch === Pitch.InPlay) { // hit
      // TODO: show batter menu
      isNext = true;
    } else if (action.pitch === Pitch.HitByPitch) { // hit by pitch
      // TODO: 1B, check runners
      this.runners.force();
      batter.kind = HitKind.Pitcher;
      batter.result = HitResult.HitByPitch;
      isNext = true;
    } else if (this.currentPitch.count(Pitch.Ball) === 4) { // bb
      // TODO: 1B, check runners
      this.runners.force();
      batter.kind = HitKind.Pitcher;
      batter.result = HitResult.BB;
      isNext = true;
    } else if ( (action.pitch === Pitch.Strike || action.pitch === Pitch.SwingMiss) &&
        this.currentPitch.count(Pitch.Strike) + this.currentPitch.count(Pitch.SwingMiss) + this.currentPitch.count(Pitch.Foul) >= 3) {
      batter.kind = HitKind.Out;
      batter.isOut = true;
      fielder.addOut();
      batter.result = action.pitch === Pitch.Strike ? HitResult.K : HitResult.KK;
      isNext = true;
    }
    action.batter = batter;
    action.fielders = fielder;
    action.runners = this.runners;
    this.actionDataService = this.actionDataService.addAction(action);

    if (isNext) {
      this.currentPitch = [];
      this.runners = new Runners(this.runners);
    }
  }
}
