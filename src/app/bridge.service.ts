import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  // Observable sources
  fielderPositionSource = new Subject<number>();
  // Observable streams
  fielderPosition$ = this.fielderPositionSource.asObservable();

  constructor() { }
}
