import { TestBed } from '@angular/core/testing';

import { DadataService } from './dadata.service';

describe('DadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DadataService = TestBed.get(DadataService);
    expect(service).toBeTruthy();
  });
});
