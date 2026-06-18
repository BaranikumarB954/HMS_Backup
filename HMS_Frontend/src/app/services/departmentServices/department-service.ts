import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartmentEmployees(page: number, limit: number, role: string) {
    return this.http.get<any>(
      `/api/department/department-employees?page=${page}&limit=${limit}&role=${role}`
    );
  }
}
