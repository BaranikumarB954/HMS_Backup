import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {

  constructor(private http: HttpClient) {}

  getApprovals(status: string) {
    return this.http.get<any>(`/api/register-approval/approval?status=${status}`);
  }

  approve(id: string) {
    return this.http.patch(`/api/register-approval/${id}/approve`, {});
  }

  reject(id: string, reason: string) {
    return this.http.patch(`/api/register-approval/${id}/reject`, { reason });
  }

}
