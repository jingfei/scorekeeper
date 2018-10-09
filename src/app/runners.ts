export class Runners {
  /* location from index to where? 
   * size fix 4
   */
  location: number[],
  score: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
