import { ActionDataService } from './action-data.service';
import { RunnersDataService } from './runners-data.service';
import { FieldersDataService } from './fielders-data.service';
import { Injectable } from '@angular/core';
import { Pitch, Action } from './action';
import { HitKind, HitResult, Batter } from './batter';

@Injectable({
  providedIn: 'root'
})
export class FieldActionService {
  currentPitch: Pitch[] = [];

  constructor(private actionDataService: ActionDataService,
              private runnersDataService: RunnersDataService,
              private fieldersDataService: FieldersDataService) { }

  getOutCount() {
    const actions: Action[] = this.actionDataService.actions;
    // TODO: getOutCount
  }

  getCurrentPitchCount(pitch: Pitch) {
    switch (pitch) {
      case Pitch.Ball:
        return this.currentPitch.count(Pitch.Ball);
      case Pitch.Strike:
        let cnt = this.currentPitch.count(Pitch.Strike) +
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

  proceedBatting(batter: Batter) {
    const action: Action = this.actionDataService.getLastAction();
    action.batter.kind = batter.kind;
    action.batter.result = batter.result;

    let forward = 0;
    switch (action.batter.result) {
      case HitResult.BB:
      case HitResult.HitByPitch:
        forward = -1; break;
      case HitResult.B1: forward = 1; break;
      case HitResult.B2: forward = 2; break;
      case HitResult.B3: forward = 3; break;
      case HitResult.HR: forward = 4; break;
    }
    if (forward === -1) {
      this.runnersDataService.force();
    } else if (forward === 0) {
      action.batter.isOut = true;
      this.fieldersDataService.addOut();
    } else {
      this.runnersDataService.hit(forward);
    }
    this.actionDataService = this.actionDataService.addAction(action);

    this.currentPitch = [];
    this.runnersDataService.addNewRunner(this.runnersDataService.getRunners);
  }

  getNewAction(): Action {
    const newAction: Action = new Action();
    const batter: Batter = new Batter();
    this.fieldersDataService = this.fieldersDataService.newFielders();

    newAction.batter = batter;
    this.fieldersDataService = this.fieldersDataService.copyFielders(this.fieldersDataService.getFielders);
    newAction.fielders = this.fieldersDataService.getFielders;
    // this.runnersDataService = this.runnersDataService.copyRunners(this.runnersDataService.getRunners);
    newAction.runners = this.runnersDataService.getRunners;
    this.actionDataService = this.actionDataService.addAction(newAction);
    return newAction;
  }

  checkPitch() {
    const action = this.getNewAction();
    action.pitch = this.currentPitch.last();

    if (action.pitch === Pitch.HitByPitch) {
      action.batter.result = HitResult.HitByPitch;
      this.proceedBatting(action.batter);
    } else if (this.currentPitch.count(Pitch.Ball) === 4) {
      action.batter.result = HitResult.BB;
      this.proceedBatting(action.batter);
    } else if ( (action.pitch === Pitch.Strike || action.pitch === Pitch.SwingMiss) &&
        this.currentPitch.count(Pitch.Strike) + this.currentPitch.count(Pitch.SwingMiss) + this.currentPitch.count(Pitch.Foul) >= 3) {
      action.batter.result = action.pitch === Pitch.Strike ? HitResult.K : HitResult.KK;
      this.proceedBatting(action.batter);
    }
  }
}
