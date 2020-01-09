import { TestBed } from '@angular/core/testing';

import { ShopTypesService } from './shop-types.service';

describe('ShopTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopTypesService = TestBed.get(ShopTypesService);
    expect(service).toBeTruthy();
  });
});
