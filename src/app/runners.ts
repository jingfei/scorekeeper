export class Runners {
  /* location from index to where?
   * size fix 4
   * -1 stands for no runner
   */
  location: number[] = [0, -1, -1, -1];
  score = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
