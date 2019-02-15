import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Runners } from './runners';

@Injectable({
  providedIn: 'root'
})
export class RunnersDataService {
  runners: Runners;

  constructor(private updateSource: Subject<object>) {
    this.runners = new Runners();
  }

  addNewRunner(last: Runners = null, location: number[] = []) {
    if (last !== null) {
      for (let i = 3; i >= 0; --i) {
        this.setRunner(last.location[i])
      }
      this.setRunner(0);
    } else if (location.length === 4) {
      for (let i = 3; i >= 0; --i) {
        this.setRunner(location[i])
      }
      this.setRunner(0);
    }
  }

  get getRunners(): Runners {
    return this.runners;
  }

  isValidIndex(index: number): boolean {
    return index < 4 && index >= 0;
  }

  find(base: number): number { // find index of runner
    for (let b of this.runners.location) {
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
      this.runners.location[index] += step;
      if (this.runners.location[index] > 3) {
        ++this.runners.score;
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

  setRunner(index: number): RunnersDataService {
    if (this.isValidIndex(index)) {
      this.runners.location[index] = index;
    }
    return this;
  }
}
