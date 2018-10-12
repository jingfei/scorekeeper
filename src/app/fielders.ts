export class Fielders {
  position: number[],
  isOut: boolean[],
  outNum: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  length(): number {
    return this.position.length;
  }

  checkIndex(i: number): boolean {
    return i < 0 || i >= this.length() ? false: true;
  }

  add(position: number, isOut: boolean = false) {
    this.position.push(position);
    this.isOut.push(isOut);
    this.outNum = isOut ? this.outNum + 1 : this.outNum;
  }

  update(index: number, position: number, isOut: boolean = false) {
    if (!this.checkIndex(index)) {
      this.add(number, isOut);
    } else {
      if (this.isOut[index] !== isOut) {
        this.outNum = isOut ? this.outNum + 1 : this.outNum - 1;
      }
      this.position[index] = position;
      this.isOut[index] = isOut;
    }
  }

  delete(index: number = -1) {
    if (!this.checkIndex(index)) {
      if (this.isOut.pop()) {
        --this.outNum;
      }
      this.position.pop();
    } else {
      if (this.isOut[index]) {
        --this.outNum;
      }
      this.position = this.position.filter((i, t) => i !== index);
      this.isOut = this.isOut.filter((i, t) => i !== index);
    }
  }

  addOut(n: number = 1) {
    this.outNum += n;
  }
}
