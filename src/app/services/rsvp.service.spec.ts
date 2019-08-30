import { TestBed } from '@angular/core/testing';

import { RsvpService } from './rsvp.service';

describe('RsvpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RsvpService = TestBed.get(RsvpService);
    expect(service).toBeTruthy();
  });
});
