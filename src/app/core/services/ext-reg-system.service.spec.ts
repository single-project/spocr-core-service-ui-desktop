import { TestBed } from '@angular/core/testing';

import { ExtRegSystemService } from './ext-reg-system.service';

describe('ExtRegSystemService', () => {
  let service: ExtRegSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtRegSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
