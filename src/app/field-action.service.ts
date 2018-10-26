import { ActionDataService } from './action-data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pitch, Action } from './action';
import { HitKind, HitResult, Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

@Injectable({
  providedIn: 'root'
})
export class FieldActionService {
  currentPitch: Pitch[] = [];
  lastRunners: Runners = new Runners();
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

  nextBatter() {
    var action: Action = this.actionDataService.getLastAction();
    var n = 0;

    this.currentPitch = [];
    switch(action.batter.result) {
      case HitResult.B1: 
        n = 1;
        break;
      case HitResult.B2: 
        n = 2;
        break;
      case HitResult.B3: 
        n = 3
        break;
    }
    if (n) {
      this.runners = action.runners;
      this.lastRunners = new Runners(this.runners);
      this.actionDataService.fieldRunnerSource.next(n);
      this.runners.hit(n);
    }
    this.actionDataService = this.actionDataService.addAction(action);

    var newAction: Action = new Action();
    var batter: Batter = new Batter();
    var fielder: Fielders = new Fielders();
    newAction.batter = batter;
    newAction.fielders = fielder;
    newAction.runners = this.runners;
    this.actionDataService = this.actionDataService.addAction(newAction);

    this.runners = new Runners(this.runners);
  }

  checkPitch() {
    var action: Action = new Action();
    var batter: Batter = new Batter();
    var fielder: Fielders = new Fielders();
    var isNext = false;

    action.pitch = this.currentPitch.last();

    if (action.pitch === Pitch.InPlay) { // hit
      // TODO: show batter menu
      // isNext = true;
    } else if (action.pitch === Pitch.HitByPitch) { // hit by pitch
      this.lastRunners = new Runners(this.runners);
      this.actionDataService.fieldRunnerSource.next(1);
      this.runners.force();
      batter.result = HitResult.HitByPitch;
      isNext = true;
    } else if (this.currentPitch.count(Pitch.Ball) === 4) { // bb
      this.lastRunners = new Runners(this.runners);
      this.actionDataService.fieldRunnerSource.next(1);
      this.runners.force();
      batter.result = HitResult.BB;
      isNext = true;
    } else if ( (action.pitch === Pitch.Strike || action.pitch === Pitch.SwingMiss) &&
        this.currentPitch.count(Pitch.Strike) + this.currentPitch.count(Pitch.SwingMiss) + this.currentPitch.count(Pitch.Foul) >= 3) {
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
