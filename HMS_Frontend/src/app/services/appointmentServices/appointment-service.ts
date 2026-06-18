import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  createAppointment(data: any) {
    return this.http.post(`/api/appointments/addAppointment`, data);
  }

  getDepartments() {
    return this.http.get(`/api/department/allDepartments`);
  }

getDoctorsByDept(deptName: string) {
  return this.http.get(`/api/doctor/getDocByDept?dept=${deptName}`);
}

  getById(id: string) {
    return this.http.get(`/api/appointments/getApmntById/${id}`);
  }

  update(id: string, data: any) {
    return this.http.put(`/api/appointments/updateAppointment/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`/api/appointments/delete/${id}`);
  }

  checkPatient(uhid: string) {
    return this.http.get(`/api/patients/checkPatient/${uhid}`);
  }

  getSlots(doctorEmployeeId: string, date: string) {
    return this.http.get(
      `/api/appointments/slots?doctorEmployeeId=${doctorEmployeeId}&appointmentDate=${date}`
    );
  }

  getAppointments(page: number, limit: number, status: string = 'ALL') {
    return this.http.get(
      `/api/appointments/getAppointments?page=${page}&limit=${limit}&status=${status}`
    );
  }

  updateStatus(id: string, status: string) {
    return this.http.put(`/api/appointments/updateStatus/${id}`, { status });
  }

  getDoctorInfo(empId: string) {
    return this.http.get(`/api/doctor/getDoctorFullInfo?empId=${empId}`);
  }

}