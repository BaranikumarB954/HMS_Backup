import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppointmentService } from '../../../../services/appointmentServices/appointment-service';

import { AddAppointment } from '../../../../shared/components/add-appointment/add-appointment';
import { NoDataComponent } from '../../../../shared/components/common/noData/no-data/no-data';
import { PaginationComponent } from '../../../../shared/components/common/pagination/pagination';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddAppointment,
    NoDataComponent,
    PaginationComponent
  ],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class AdminAppointments implements OnInit {

  appointments: any[] = [];

  page = 1;
  limit = 5;
  totalPages = 1;

  showPopup = false;

  statusFilter = 'ALL';

  appointmentStatuses = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'BOOKED',
    'CANCELLED',
    'COMPLETED'
  ];

  form: any = {
    patientUHID: '',
    doctorEmployeeId: '',
    deptName: '',
    appointmentDate: '',
    timeslot: {
      start: '',
      end: ''
    }
  };

  constructor(
    private service: AppointmentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service
      .getAppointments(this.page, this.limit, this.statusFilter)
      .subscribe({
        next: (res: any) => {
          this.appointments = res.data.data;
          this.totalPages = res.data.pagination.totalPages;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onStatusChange(): void {
    this.page = 1;
    this.load();
  }

  changeStatus(id: string, status: string): void {
    this.service.updateStatus(id, status).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.load();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.page = 1;
    this.load();
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  onAppointmentAdded(): void {
    this.closePopup();
    this.load();
  }

  submit(): void {
    this.service.createAppointment(this.form).subscribe({
      next: () => {
        alert('Appointment Created Successfully');
        this.closePopup();
        this.load();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Are you sure?')) {
      return;
    }

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

}