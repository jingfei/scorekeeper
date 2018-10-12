import { TestBed } from '@angular/core/testing';

import { TextIconService } from './text-icon.service';

describe('TextIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextIconService = TestBed.get(TextIconService);
    expect(service).toBeTruthy();
  });
});
