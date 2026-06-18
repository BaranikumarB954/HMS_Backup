 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OwnerDashboardService {

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any>('/api/owner/dashboard-stats');
  }
}