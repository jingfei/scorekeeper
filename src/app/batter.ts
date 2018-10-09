export class Batter {
  /* kind:
   * ground
   * line drive
   * fly
   */
  kind: string,
  /* result:
   * 1B
   * 2B
   * 3B
   * HR
   */
  result: string,
  isOut: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
