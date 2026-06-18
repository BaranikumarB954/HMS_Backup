import { TestBed } from '@angular/core/testing';

import { OwnerAdminService } from './owner-admin-service';

describe('OwnerAdminService', () => {
  let service: OwnerAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
