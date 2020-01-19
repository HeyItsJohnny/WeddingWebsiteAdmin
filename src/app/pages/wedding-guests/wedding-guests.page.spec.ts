import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingGuestsPage } from './wedding-guests.page';

describe('WeddingGuestsPage', () => {
  let component: WeddingGuestsPage;
  let fixture: ComponentFixture<WeddingGuestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingGuestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingGuestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
