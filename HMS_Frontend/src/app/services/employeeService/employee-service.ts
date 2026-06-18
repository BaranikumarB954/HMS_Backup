import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<any>('/api/employee/allEmployees');
  }

  addEmployee(data: any) {
    return this.http.post('/api/employee/addEmployeeByAdmin', data);
  }

  updateEmployee(userId: string, data: any) {
    return this.http.put(`/api/employee/update/${userId}`, data);
  }
  
  toggleStatus(userId: string) {
    return this.http.patch<any>(`/api/employee/toggle/${userId}`, {});
  }
}