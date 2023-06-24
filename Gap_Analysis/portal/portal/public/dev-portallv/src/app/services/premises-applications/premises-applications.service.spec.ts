import { TestBed } from '@angular/core/testing';

import { PremisesApplicationsService } from './premises-applications.service';

describe('PremisesApplicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremisesApplicationsService = TestBed.get(PremisesApplicationsService);
    expect(service).toBeTruthy();
  });
});
