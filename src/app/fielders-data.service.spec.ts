import { TestBed } from '@angular/core/testing';

import { FieldersDataService } from './fielders-data.service';

describe('FieldersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldersDataService = TestBed.get(FieldersDataService);
    expect(service).toBeTruthy();
  });
});
