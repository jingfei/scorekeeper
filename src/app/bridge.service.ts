import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  // fielderPosition Observable sources
  fielderPositionSource = new Subject<number>();
  // fielderPosition Observable streams
  fielderPosition$ = this.fielderPositionSource.asObservable();

  // runnerUpdate Observable sources
  runnerUpdateSource = new Subject<object>();
  // runnerUpdate Observable streams
  runnerUpdate$ = this.runnerUpdateSource.asObservable();

  // fieldDisplay Observable sources
  fieldDisplaySource = new Subject<object>();
  // fieldDisplay Observable streams
  fieldDisplay$ = this.fieldDisplaySource.asObservable();

  // outUpdate Observable sources
  outUpdateSource = new Subject<object>();
  // outUpdate Observable streams
  outUpdate$ = this.outUpdateSource.asObservable();
}
