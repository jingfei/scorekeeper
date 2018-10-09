export class Fielders {
  position: number[],
  // out at where
  isOut: number[],
  outNum: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
