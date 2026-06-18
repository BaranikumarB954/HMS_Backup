import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 

@Injectable({ providedIn: 'root' })
export class OwnerAdminService {

  constructor(private http: HttpClient) {}

  getAdmins() {
    return this.http.get<any>('/api/owner/getAllAdmins');
  }

  addAdmin(data: any) {
    return this.http.post('/api/owner/addAdmin', data);
  }

  updateAdmin(userId: string, data: any) {
    return this.http.put(`/api/owner/updateAdmin/${userId}`, data);
  }

  deleteAdmin(userId: string) {
    return this.http.delete(`/api/owner/deleteAdmin/${userId}`);
  }

  toggleStatus(userId: string) {
    return this.http.patch(`/api/owner/toggleAdmin/${userId}`, {});
  }
}