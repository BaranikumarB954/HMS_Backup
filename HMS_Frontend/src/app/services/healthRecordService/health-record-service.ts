import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>('/api/health-record');
  }

  getById(id: string) {
    return this.http.get<any>(`/api/health-record/${id}`);
  }

  getByAppointment(appointmentId: string) {
    return this.http.get<any>(
      `/api/health-record/appointment/${appointmentId}`
    );
  }

  create(data: any) {
    return this.http.post<any>(
      '/api/health-record',
      data
    );
  }

  update(id: string, data: any) {
    return this.http.put<any>(
      `/api/health-record/${id}`,
      data
    );
  }

  delete(id: string) {
    return this.http.delete<any>(
      `/api/health-record/${id}`
    );
  }

}