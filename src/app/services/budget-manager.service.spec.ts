import { TestBed } from '@angular/core/testing';

import { BudgetManagerService } from './budget-manager.service';

describe('BudgetManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetManagerService = TestBed.get(BudgetManagerService);
    expect(service).toBeTruthy();
  });
});
