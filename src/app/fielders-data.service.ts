import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Fielders } from './fielders';

@Injectable({
  providedIn: 'root'
})
export class FieldersDataService {
  fielders: Fielders;

  constructor(private outUpdateSource: Subject<number>) {
    this.fielders = new Fielders();
  }

  get getFielders(): Fielders {
    return this.fielders;
  }

  copyFielders(fielders: Fielders): FieldersDataService {
    this.fielders = fielders;
    return this;
  }

  newFielders(values: Object = {}) {
    Object.assign(this, values);
    return this;
  }

  length(): number {
    return this.fielders.position.length;
  }

  checkIndex(i: number): boolean {
    return i < 0 || i >= this.length() ? false : true;
  }

  add(position: number, isOut: boolean = false): FieldersDataService {
    this.fielders.position.push(position);
    this.fielders.isOut.push(isOut);
    if (isOut) {
      this.addOut();
    }
    return this;
  }

  update(index: number, position: number, isOut: boolean = false): FieldersDataService {
    if (!this.checkIndex(index)) {
      this.add(index, isOut);
    } else {
      if (this.fielders.isOut[index] !== isOut) {
        isOut ? this.addOut() : this.addOut(-1);
      }
      this.fielders.position[index] = position;
      this.fielders.isOut[index] = isOut;
    }
    return this;
  }

  delete(index: number = -1): FieldersDataService {
    if (!this.checkIndex(index)) {
      if (this.fielders.isOut.pop()) {
        this.addOut(-1);
      }
      this.fielders.position.pop();
    } else {
      if (this.fielders.isOut[index]) {
        this.addOut(-1);
      }
      this.fielders.position = this.fielders.position.filter((t, i) => i !== index);
      this.fielders.isOut = this.fielders.isOut.filter((t, i) => i !== index);
    }
    return this;
  }

  addOut(n: number = 1): FieldersDataService {
    this.fielders.outNum += n;
    this.outUpdateSource.next(this.fielders.outNum);
    return this;
  }

  clear(): FieldersDataService {
    this.fielders.position = [];
    this.fielders.isOut = [];
    this.addOut(-this.fielders.outNum);
    return this;
  }
}
