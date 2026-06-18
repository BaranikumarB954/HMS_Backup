import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../services/appointmentServices/appointment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAppointment } from '../../../../shared/components/add-appointment/add-appointment';
import { NoDataComponent } from '../../../../shared/components/common/noData/no-data/no-data';
import { PaginationComponent } from '../../../../shared/components/common/pagination/pagination';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule,FormsModule,AddAppointment,NoDataComponent,PaginationComponent],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class AdminAppointments implements OnInit{
appointments: any[] = [];

  page = 1;
  limit = 5;
  totalPages = 1;

  showModal = false;

  form: any = {
    patientUHID: '',
    doctorEmployeeId: '',
    deptName: '',
    appointmentDate: '',
    timeslot: { start: '', end: '' }
  };

  constructor(private service: AppointmentService, private cd : ChangeDetectorRef) {}

  statusFilter = 'ALL';

load() {
  this.service.getAppointments(this.page, this.limit, this.statusFilter)
    .subscribe((res: any) => {
      this.appointments = res.data.data;
      this.totalPages = res.data.pagination.totalPages;
      this.cd.detectChanges();
    });
}

setStatus(status: string) {
  this.statusFilter = status;
  this.page = 1;
  this.load();
}

changeStatus(id: string, status: string) {
  this.service.updateStatus(id, status).subscribe(() => {
    this.load();
  });
}

onPageChange(p: number) {
  this.page = p;
  this.load();
}

onLimitChange(l: number) {
  this.limit = l;
  this.page = 1;
  this.load();
}

  ngOnInit() {
    this.load();
  }

  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  onAppointmentAdded() {
    this.closePopup();
    this.load(); // refresh table
  }

 
  submit() {
    this.service.createAppointment(this.form).subscribe({
      next: () => {
        alert("Appointment Created Successfully");
        this.closePopup();
        this.load();
        this.cd.detectChanges();

      },
      error: (err) => alert(err.error.message)
    });
  }

 
  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

}
