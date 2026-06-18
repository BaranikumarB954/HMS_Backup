import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DoctorService {

  constructor(private http: HttpClient) {}
  getDashboard() {
    return this.http.get('/api/doctor/dashboard');
  }
  
  getDoctors() {
    return this.http.get<any>('/api/doctor/getDocInfoByDept');
  }

  updateDoctor(employeeId: string, data: any) {
    return this.http.put(`/api/doctor/updateDoctor/${employeeId}`, data);
  }

  addDoctor(data: any) {
    return this.http.post('/api/doctor/addDoctorByAdmin', data);
  }
}