import { TestBed } from '@angular/core/testing';

import { ShopDepartsService } from './shop-departs.service';

describe('ShopDepartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopDepartsService = TestBed.get(ShopDepartsService);
    expect(service).toBeTruthy();
  });
});
