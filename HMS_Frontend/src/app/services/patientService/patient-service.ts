import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private http: HttpClient) {}

  
  getPatients() {
  return this.http.get<any>('/api/patients/allPatients');
}

addPatient(data: any) {
  return this.http.post<any>('/api/patients/addPatient', data);
}

updatePatient(id: string, data: any) {
  return this.http.put(`/api/patients/update/${id}`, data);
}

deletePatient(id: string) {
  return this.http.delete(`/api/patients/delete/${id}`);
}

toggleStatus(userId: string) {
  return this.http.patch(`/api/patients/toggle/${userId}`, {});
}

  getMeta() {
    return this.http.get<any>('/api/meta/patient');
  }
}