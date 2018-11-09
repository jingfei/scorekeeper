import { Subject } from 'rxjs';

export class Runners {
  /* location from index to where? 
   * size fix 4
   * -1 stands for no runner
   */
  location: number[] = [0, -1, -1, -1];
  score: number = 0;

  constructor(private updateSource: Subject<object>, last: Runners = null, location: number[] = []) {
    if (last !== null) {
      for (let i in this.location) {
        this.setRunner(last.location[i])
      }
    } else if (location.length === 4) {
      for (let i in this.location) {
        this.setRunner(location[i])
      }
    }
  }

  isValidIndex(index: number): boolean {
    return index < 4 && index >= 0;
  }

  find(base: number): number { // find index of runner
    for (let b of this.location) {
      if (b === base) {
        return b;
      }
    }
    return -1;
  }

  hit(step: number) { // every runner go step
    for (var base = 3; base >= 0; --base) {
      if (this.hasRunner(base)) {
        this.go(base, step);
      }
    }
  }

  go(base: number, step: number = 1) {
    var index = this.find(base);
    if (index !== -1) {
      this.updateSource.next({pos: base, runto: base + step});
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
      this.go(base);
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
