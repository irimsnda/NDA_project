import { TestBed } from '@angular/core/testing';

import { DocumentManagementService } from './document-management.service';

describe('DocumentManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentManagementService = TestBed.get(DocumentManagementService);
    expect(service).toBeTruthy();
  });
});
