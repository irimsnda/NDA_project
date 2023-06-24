import { TestBed } from '@angular/core/testing';

import { BloodproductssrvService } from './bloodproductssrv.service';

describe('BloodproductssrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodproductssrvService = TestBed.get(BloodproductssrvService);
    expect(service).toBeTruthy();
  });
});
