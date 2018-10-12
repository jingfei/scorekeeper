export class Runners {
  /* location from index to where? 
   * size fix 4
   * -1 stands for no runner
   */
  location: number[],
  score: number;

  constructor(last: Runners = null) {
    this.location.push(0);
    this.location.push(-1);
    this.location.push(-1);
    this.location.push(-1);

    if (last !== null) {
      for (int i = 0; i < 4; ++i) {
        setRunner(last.location[i])
      }
    }
  }

  isValidIndex(index: number): boolean {
    return index < 4 && index >= 0;
  }

  find(base: number): number { // find index of runner
    for (int i = 0; i < 4; ++i) {
      if (this.location[i] === base) {
        return i;
      }
    }
    return -1;
  }

  go(base: number, step: number = 1) {
    index = this.find(base);
    if (index !== -1) {
      this.location[index] += step;
      if (this.location[index] > 3) {
        ++this.score;
      }
    }
  }

  force(base: number = 0) { // forced base from batter
    if(this.isValidIndex(base)) {
      if (this.hasRunner(base + 1)) {
        this.force(base + 1);
      }
      go(base);
    }
  }

  hasRunner(base: number): boolean { // find if base had runner
    return this.find(base) !== -1;
  }

  setRunner(index: number) {
    if (this.isValidIndex(index)) {
      this.location[index] = index;
    }
  }
}
