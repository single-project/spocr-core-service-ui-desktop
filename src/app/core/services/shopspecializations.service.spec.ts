import { TestBed } from '@angular/core/testing';

import { ShopspecializationsService } from './shopspecializations.service';

describe('ShopspecializationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopspecializationsService = TestBed.get(ShopspecializationsService);
    expect(service).toBeTruthy();
  });
});
