import { TestBed } from '@angular/core/testing';

import { WeddingAutomationsService } from './wedding-automations.service';

describe('WeddingAutomationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeddingAutomationsService = TestBed.get(WeddingAutomationsService);
    expect(service).toBeTruthy();
  });
});
