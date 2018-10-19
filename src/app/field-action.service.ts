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

  constructor(private actionDataService: ActionDataService) { 
  }

  recordPitch(pitch: string) {
    this.currentPitch.push(pitch);
    console.log(this.currentPitch);
    this.checkPitch();
  }

  deleteLastPitch() {
    // TODO: ActionDataService pop
    this.currentPitch.pop();
  }

  recordHitKind(kind: string) {
    var action: Action = this.actionDataService.getLastAction();
    action.batter.kind = kind;
    this.actionDataService = this.actionDataService.addAction(action);
  }

  recordHitResult(res: string) {
    var action: Action = this.actionDataService.getLastAction();
    action.batter.result = res;
    this.actionDataService = this.actionDataService.addAction(action);
  }

  recordFielder(pos: number, isOut: boolean = false) {
    var action: Action = this.actionDataService.getLastAction();
    action.fielders.add(pos, isOut);
    this.actionDataService = this.actionDataService.addAction(action);
    console.log(this.actionDataService.actions);
  }

  checkPitch() {
    var action: Action = new Action();
    var batter: Batter = new Batter();
    var fielder: Fielders = new Fielders();
    var isNext = false;

    action.pitch = this.currentPitch.last();

    if (action.pitch === 'o') { // hit
      // TODO: show batter menu
      isNext = true;
    } else if (action.pitch === 'd') { // hit by pitch
      // TODO: 1B, check runners
      batter.kind = 'pitcher';
      batter.result = 'D';
      isNext = true;
    } else if (this.currentPitch.count('b') === 4) { // bb
      // TODO: 1B, check runners
      batter.kind = 'pitcher';
      batter.result = 'BB';
      isNext = true;
    } else if ( (action.pitch === 's' || action.pitch === 'w') &&
        this.currentPitch.count('s') + this.currentPitch.count('w') + this.currentPitch.count('f') >= 3) {
      batter.kind = 'out';
      batter.isOut = true;
      fielder.addOut();
      batter.result = action.pitch === 's' ? 'K' : 'KK';
      isNext = true;
    }
    action.batter = batter;
    action.fielders = fielder;
    this.actionDataService = this.actionDataService.addAction(action);
    console.log(this.actionDataService.actions);

    if (isNext) {
      this.currentPitch = [];
    }
  }
}
