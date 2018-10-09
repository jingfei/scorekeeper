import { Injectable } from '@angular/core';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class ActionDataService {
  lastId = 0;
  actions: Action[] = [];

  constructor() { }

  addAction(action: Action): ActionDataService {
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

  getActionPitch(): Action {
    return this.actions.pop();
  }

}
