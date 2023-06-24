import { TestBed } from '@angular/core/testing';

import { PromotionadvertService } from './promotionadvert.service';

describe('PromotionadvertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionadvertService = TestBed.get(PromotionadvertService);
    expect(service).toBeTruthy();
  });
});
