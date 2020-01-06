import { TestBed } from '@angular/core/testing';

import { CounterpartiesService } from './counterparties.service';

describe('CounterpartiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterpartiesService = TestBed.get(CounterpartiesService);
    expect(service).toBeTruthy();
  });
});
