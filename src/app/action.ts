export class Action {
  id: number,
  /* pitch status
   * b: ball
   * s: strike
   * w: swing and miss
   * f: foul
   * o: in play
   * d: hit by pitch
   */
  pitch: string,
  batter: Batter,
  fielders: Fielders,
  runners: Runners,
  outs: number,
  score: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
