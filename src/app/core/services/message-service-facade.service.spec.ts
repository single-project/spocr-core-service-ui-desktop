import { TestBed } from '@angular/core/testing';

import { MessageServiceFacadeService } from './message-service-facade.service';

describe('MessageServiceFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageServiceFacadeService = TestBed.get(MessageServiceFacadeService);
    expect(service).toBeTruthy();
  });
});
