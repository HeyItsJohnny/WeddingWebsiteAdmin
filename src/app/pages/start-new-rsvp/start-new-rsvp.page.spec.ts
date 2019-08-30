import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewRsvpPage } from './start-new-rsvp.page';

describe('StartNewRsvpPage', () => {
  let component: StartNewRsvpPage;
  let fixture: ComponentFixture<StartNewRsvpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNewRsvpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewRsvpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
