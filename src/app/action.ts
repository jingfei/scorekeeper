import { Batter } from './batter';
import { Fielders } from './fielders';
import { Runners } from './runners';

export class Action {
  id: number;
  /* pitch status
   * b: ball
   * s: strike
   * w: swing and miss
   * f: foul
   * o: in play
   * d: hit by pitch
   */
  pitch: string;
  batter: Batter;
  fielders: Fielders;
  runners: Runners;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
