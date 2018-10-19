export class Batter {
  /* kind:
   * ground
   * line drive
   * fly
   * pitcher
   * out
   */
  kind: string;
  /* result:
   * 1B
   * 2B
   * 3B
   * HR
   */
  result: string;
  isOut: boolean;

  constructor(values: Object = {}) {
    this.isOut = false;
    Object.assign(this, values);
  }
}
