import { BridgeService } from './bridge.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { BaseballField } from 'baseball-field-component/dist/BaseballField';

@Component({
  selector: 'baseball-field',
  template: ''
})
export class BaseballFieldComponent implements OnInit {
  subscription: Subscription;
  props: object = {};

  constructor(private bridgeService: BridgeService) { 
    this.subscription = bridgeService.runnerUpdate$.subscribe(
        (runner: object) => this.render({setRunner: runner}));
    this.subscription = bridgeService.fieldDisplay$.subscribe(
        (fieldDisplay: object) => this.render(fieldDisplay));

    this.handleFieldersMove = this.handleFieldersMove.bind(this);
  }

  handleFieldersMove(fielders) {
    this.bridgeService.fielderPositionSource.next(fielders.pos);
  }

  ngOnInit() {
    this.render({ 
      isShowFielders: false, 
      onFieldersMove: this.handleFieldersMove
    });
  }

  render(props: object) {
    Object.assign(this.props, props);
    ReactDOM.render(React.createElement(BaseballField, this.props), document.querySelector('.field-container'));
  }
}
