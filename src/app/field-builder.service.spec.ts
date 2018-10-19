import { TestBed } from '@angular/core/testing';

import { FieldBuilderService } from './field-builder.service';

describe('FieldBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldBuilderService = TestBed.get(FieldBuilderService);
    expect(service).toBeTruthy();
  });
});
