import { TestBed } from '@angular/core/testing';

import { FieldActionService } from './field-action.service';

describe('FieldActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldActionService = TestBed.get(FieldActionService);
    expect(service).toBeTruthy();
  });
});
