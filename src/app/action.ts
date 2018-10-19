import { Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

export enum Pitch {
  Ball, Strike, SwingMiss, Foul, InPlay, HitByPitch
}

export class Action {
  id: number;
  pitch: Pitch;
  batter: Batter;
  fielders: Fielders;
  runners: Runners;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
