import { ActionDataService } from './action-data.service';
import { Injectable } from '@angular/core';
import { Action } from './action';
import { Batter } from './batter';
import { Fielders } from './fielders';

@Injectable({
  providedIn: 'root'
})
export class FieldActionService {
  currentPitch: string[] = [];

  constructor(private actionDataService: ActionDataService) { }

  recordPitch(pitch: string) {
    currentPitch.push(pitch);
    this.checkPitch();
  }

  deleteLastPitch() {
    // TODO: ActionDataService pop
    currentPitch.pop();
  }

  recordHitKind(kind: string) {
    action: Action = getLastAction();
    action.batter.kind = kind;
    this.actionDataService = addAction(action);
  }

  recordHitResult(res: string) {
    action: Action = getLastAction();
    action.batter.result = res;
    this.actionDataService = addAction(action);
  }

  recordFielder(pos: number, isOut: boolean = false) {
    action: Action = getLastAction();
    action.fielders.add(pos, isOut);
    this.actionDataService = addAction(action);
  }

  checkPitch() {
    action: Action = new Action();
    batter: Batter = new Batter();
    fielder: Fielder = new Fielder();
    isNext = false;

    action.pitch = currentPitch.last();

    if (action.pitch === 'o') { // hit
      // TODO: show batter menu
    } else if (action.pitch === 'd') { // hit by pitch
      // TODO: 1B, check runners
      batter.kind = 'pitcher';
      batter.result = 'D';
      isNext = true;
    } else if (currentPitch.count('b') === 4) { // bb
      // TODO: 1B, check runners
      batter.kind = 'pitcher';
      batter.result = 'BB';
      isNext = true;
    } else if ( (action.pitch === 's' || action.pitch === 'w') &&
        currentPitch.count('s') + currentPitch.count('w') + currentPitch.count('f') >= 3) {
      batter.kind = 'out';
      batter.isOut = true;
      fielder.addOut();
      batter.result = action.pitch === 's' ? 'K' : 'KK';
      isNext = true;
    }
    action.batter = batter;
    action.fielder = fielder;
    this.actionDataService = addAction(action);

    if (isNext) {
      this.currentPitch = [];
    }
  }
}
