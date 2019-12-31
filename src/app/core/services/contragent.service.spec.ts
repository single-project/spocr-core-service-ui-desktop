import { TestBed } from '@angular/core/testing';

import { ContragentService } from './contragent.service';

describe('ContragentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContragentService = TestBed.get(ContragentService);
    expect(service).toBeTruthy();
  });
});
