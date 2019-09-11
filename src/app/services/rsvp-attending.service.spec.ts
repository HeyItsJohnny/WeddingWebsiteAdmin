import { TestBed } from '@angular/core/testing';

import { RsvpAttendingService } from './rsvp-attending.service';

describe('RsvpAttendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RsvpAttendingService = TestBed.get(RsvpAttendingService);
    expect(service).toBeTruthy();
  });
});
