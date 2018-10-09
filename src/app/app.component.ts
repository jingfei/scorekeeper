import { ActionDataService } from './action-data.service';
import { Component, OnInit } from '@angular/core';
import { Action } from './action';
import { Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ActionDataService]
})
export class AppComponent implements OnInit {
  title = 'scorekeeper';

  newAction: Action = new Action();

  constructor(private actionDataService: ActionDataService) {
  }

  addPitch(p: string) {
    this.newAction.pitch = p;
  }

}
