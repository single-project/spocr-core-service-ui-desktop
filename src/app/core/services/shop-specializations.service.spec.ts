import { TestBed } from '@angular/core/testing';

import { ShopSpecializationsService } from './shop-specializations.service';

describe('ShopSpecializationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopSpecializationsService = TestBed.get(ShopSpecializationsService);
    expect(service).toBeTruthy();
  });
});
