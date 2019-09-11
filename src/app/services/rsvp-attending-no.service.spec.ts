import { TestBed } from '@angular/core/testing';

import { RsvpAttendingNoService } from './rsvp-attending-no.service';

describe('RsvpAttendingNoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RsvpAttendingNoService = TestBed.get(RsvpAttendingNoService);
    expect(service).toBeTruthy();
  });
});
