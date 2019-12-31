import { TestBed } from '@angular/core/testing';

import { SalePointService } from './sale-point.service';

describe('SalePointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalePointService = TestBed.get(SalePointService);
    expect(service).toBeTruthy();
  });
});
