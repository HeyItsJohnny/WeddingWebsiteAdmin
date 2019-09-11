import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpDietRestrictionsPage } from './rsvp-diet-restrictions.page';

describe('RsvpDietRestrictionsPage', () => {
  let component: RsvpDietRestrictionsPage;
  let fixture: ComponentFixture<RsvpDietRestrictionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpDietRestrictionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpDietRestrictionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
