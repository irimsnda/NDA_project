import { TestBed } from '@angular/core/testing';

import { AccountManagementService } from './account-management.service';

describe('AccountManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountManagementService = TestBed.get(AccountManagementService);
    expect(service).toBeTruthy();
  });
});
