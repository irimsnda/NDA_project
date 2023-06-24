import { TestBed } from '@angular/core/testing';

import { ProductApplicationService } from './product-application.service';

describe('ProductApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductApplicationService = TestBed.get(ProductApplicationService);
    expect(service).toBeTruthy();
  });
});
