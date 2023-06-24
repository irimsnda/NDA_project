import { TestBed } from '@angular/core/testing';

import { DrushopApplicationsService } from './drushop-applications.service';

describe('DrushopApplicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrushopApplicationsService = TestBed.get(DrushopApplicationsService);
    expect(service).toBeTruthy();
  });
});
