import { TestBed } from '@angular/core/testing';

import { DrushopsRegistrationService } from './drushops-registration.service';

describe('DrushopsRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrushopsRegistrationService = TestBed.get(DrushopsRegistrationService);
    expect(service).toBeTruthy();
  });
});
