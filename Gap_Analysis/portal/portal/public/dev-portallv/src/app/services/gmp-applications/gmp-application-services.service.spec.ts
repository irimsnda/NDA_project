import { TestBed } from '@angular/core/testing';

import { GmpApplicationServicesService } from './gmp-application-services.service';

describe('GmpApplicationServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmpApplicationServicesService = TestBed.get(GmpApplicationServicesService);
    expect(service).toBeTruthy();
  });
});
