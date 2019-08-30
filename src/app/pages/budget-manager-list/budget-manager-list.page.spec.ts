import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetManagerListPage } from './budget-manager-list.page';

describe('BudgetManagerListPage', () => {
  let component: BudgetManagerListPage;
  let fixture: ComponentFixture<BudgetManagerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetManagerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetManagerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
