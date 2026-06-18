import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddAppointment } from '../../../../shared/components/add-appointment/add-appointment';
import { NoDataComponent } from '../../../../shared/components/common/noData/no-data/no-data';
import { AppointmentService } from '../../../../services/appointmentServices/appointment-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reception-appointments',
  imports: [CommonModule,FormsModule,AddAppointment,NoDataComponent,MatIconModule],
  templateUrl: './reception-appointments.html',
  styleUrl: './reception-appointments.css',
})
export class ReceptionAppointments {
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

  ngOnInit() {
    this.load();
  }

 
  load() {
    if (this.limit < 5) this.limit = 5;
    if (this.limit > 30) this.limit = 30;

    this.service.getAppointments(this.page, this.limit)
      .subscribe((res: any) => {
        this.appointments = res.data.data;
        console.log("APPOITNMENT DATA : ", this.appointments)
        this.totalPages = res.data.pagination.totalPages;
        this.cd.detectChanges()
      });
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
