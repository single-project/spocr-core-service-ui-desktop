import { TestBed } from '@angular/core/testing';

import { PersonalRekvService } from './personal-rekv.service';

describe('PersonalRekvService', () => {
  let service: PersonalRekvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalRekvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
