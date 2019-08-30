import { TestBed } from '@angular/core/testing';

import { RsvpGuestService } from './rsvp-guest.service';

describe('RsvpGuestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RsvpGuestService = TestBed.get(RsvpGuestService);
    expect(service).toBeTruthy();
  });
});
