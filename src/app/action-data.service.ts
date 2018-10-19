import { Injectable } from '@angular/core';
import { Action } from './action';
import { TextIconService } from './text-icon.service';

@Injectable({
  providedIn: 'root'
})
export class ActionDataService {
  lastId = 0;
  actions: Action[] = [];

  constructor(private textIconService: TextIconService) { }

  addAction(action: Action): ActionDataService {
    var isNew = false;
    // Update exist data
    if (action.id > 0) {
      this.actions = this.actions.map(act => {
        if (act.id === action.id) {
          isNew = true;
          return action;
        }
        return act;
      });
      if (isNew) {
        return this;
      }
    }
    // add new data
    action.id = ++this.lastId;
    this.actions.push(action);
    return this;
  }

  deleteActionById(id: number): ActionDataService {
    this.actions = this.actions.filter(action => action.id !== id);
    return this;
  }

  deleteLastAction(): ActionDataService {
    this.actions.pop();
    return this;
  }

  getActionById(id: number): Action {
    return this.actions.filter(action => action.id === id).pop();
  }

  getLastAction(): Action {
    return this.actions.pop();
  }

  getPitchIconHtml(id: string): string {
    return this.textIconService.getPitchIcon(id).outerHTML;
  }

  getHitKindIconHtml(id: string): string {
    return this.textIconService.getHitKindIcon(id).outerHTML;
  }
}
