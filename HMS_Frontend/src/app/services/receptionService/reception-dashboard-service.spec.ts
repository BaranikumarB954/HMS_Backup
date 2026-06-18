import { TestBed } from '@angular/core/testing';

import { ReceptionDashboardService } from './reception-dashboard-service';

describe('ReceptionDashboardService', () => {
  let service: ReceptionDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptionDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
