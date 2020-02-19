import { TestBed } from '@angular/core/testing';

import { ShopdepartsService } from './shopdeparts.service';

describe('ShopdepartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopdepartsService = TestBed.get(ShopdepartsService);
    expect(service).toBeTruthy();
  });
});
