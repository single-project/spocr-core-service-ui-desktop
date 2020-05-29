import { TestBed } from '@angular/core/testing';

import { SalesChannelService } from './sales-channel.service';

describe('SalesChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesChannelService = TestBed.get(SalesChannelService);
    expect(service).toBeTruthy();
  });
});
