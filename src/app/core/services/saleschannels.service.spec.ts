import { TestBed } from '@angular/core/testing';

import { SaleschannelsService } from './saleschannels.service';

describe('SaleschannelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleschannelsService = TestBed.get(SaleschannelsService);
    expect(service).toBeTruthy();
  });
});
