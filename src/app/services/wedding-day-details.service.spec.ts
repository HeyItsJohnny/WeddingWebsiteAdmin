import { TestBed } from '@angular/core/testing';

import { WeddingDayDetailsService } from './wedding-day-details.service';

describe('WeddingDayDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeddingDayDetailsService = TestBed.get(WeddingDayDetailsService);
    expect(service).toBeTruthy();
  });
});
