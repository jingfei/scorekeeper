import { TestBed } from '@angular/core/testing';

import { RunnersDataService } from './runners-data.service';

describe('RunnersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunnersDataService = TestBed.get(RunnersDataService);
    expect(service).toBeTruthy();
  });
});
