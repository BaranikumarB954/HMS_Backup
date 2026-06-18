import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from '../../../services/appointmentServices/appointment-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-appointment.html',
  styleUrls: ['./add-appointment.css']
})
export class AddAppointment implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  form: any = {
    patientUHID: '',
    doctorEmployeeId: '',
    deptName: '',
    appointmentDate: '',
    timeslot: { start: '', end: '' }
  };

  departments: any[] = [];
  doctors: any[] = [];
  dateError = '';
  doctorMap: Map<string, any> = new Map();

  doctorError = '';
  loadingDoctors = false;

  availableSlots: any[] = [];
  selectedDoctor: any = null;

  errors: any = {};

  // ✅ DATE RANGE
  minDate: string = '';
  maxDate: string = '';

  constructor(private service: AppointmentService) {}

  ngOnInit() {
    this.loadDepartments();

    // ✅ TODAY + NEXT 2 MONTHS (FULL MONTH)
    const today = new Date();

    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const max = new Date(today.getFullYear(), today.getMonth() + 3, 0);

    this.minDate = min.toISOString().split('T')[0];
    this.maxDate = max.toISOString().split('T')[0];
  }

  loadDepartments() {
    this.service.getDepartments().subscribe((res: any) => {
      this.departments = res.data || [];
    });
  }

  onDeptChange() {
    this.doctors = [];
    this.doctorMap.clear();
    this.form.doctorEmployeeId = '';
    this.doctorError = '';

    if (!this.form.deptName) return;

    this.loadingDoctors = true;

    this.service.getDoctorsByDept(this.form.deptName)
      .subscribe({
        next: (res: any) => {
          this.doctors = res.data || [];

          this.doctors.forEach(doc => {
            this.doctorMap.set(doc.employeeId, doc);
          });

          this.loadingDoctors = false;
        },
        error: () => {
          this.loadingDoctors = false;
        }
      });
  }

  onDateChange() {
  this.dateError = '';
  this.availableSlots = [];

  if (!this.form.doctorEmployeeId || !this.form.appointmentDate) {
    return;
  }

  this.service.getSlots(
    this.form.doctorEmployeeId,
    this.form.appointmentDate
  ).subscribe({
    next: (res: any) => {
      this.availableSlots = res.data || [];

      if (this.availableSlots.length === 0) {
        this.dateError = "No slots available for selected date";
      }
    },
    error: (err) => {
      this.availableSlots = [];
      this.dateError = err.error.message;
    }
  });
}

  selectSlot(slot: any) {
  if (slot.isBooked) return;

  this.form.timeslot = {
    start: slot.start,
    end: slot.end
  };
}

  validateDoctor() {
    console.log("Doctor validation working");
    
    const value = this.form.doctorEmployeeId?.trim();

    if (!value) {
      this.doctorError = '';
      return;
    }


    if (!this.form.deptName) {
      this.doctorError = 'Select department first';
      return;
    }

    if (this.loadingDoctors) {
      this.doctorError = 'Loading doctors...';
      return;
    }

    if (!this.doctorMap.has(value)) {
      this.doctorError = 'Doctor not found in selected department';
    } else {
      this.doctorError = '';
    }

    // If date already selected → reload slots
    if (this.form.appointmentDate) {
      this.onDateChange();
    }

    const doc = this.doctorMap.get(this.form.doctorEmployeeId);

  if (!doc) {
    this.doctorError = "Doctor not found";
    this.availableSlots = [];
    return;
  }

  this.doctorError = '';
  this.selectedDoctor = doc;

  // 🔥 CALL API TO GET FULL DOCTOR INFO (YOU NEED THIS ENDPOINT)
  this.service.getDoctorInfo(this.form.doctorEmployeeId)
    .subscribe((res: any) => {
      const doctor = res.data;
    });

  }

  generateSlots(start: string, end: string) {
  this.availableSlots = [];

  let current = this.toMinutes(start);
  const endTime = this.toMinutes(end);

  while (current + 30 <= endTime) {
    const slotStart = this.toTime(current);
    const slotEnd = this.toTime(current + 30);

    this.availableSlots.push({
      start: slotStart,
      end: slotEnd
    });

    current += 30;
  }
}

toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

toTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

validatePatient() {
  if (!this.form.patientUHID) return;

  this.service.checkPatient(this.form.patientUHID)
    .subscribe({
      next: () => {
        this.errors.patientUHID = '';
      },
      error: () => {
        this.errors.patientUHID = "Patient not found";
      }
    });
}

  validateForm() {
    this.errors = {};

    // ✅ UHID VALIDATION (STRICT)
    if (!this.form.patientUHID) {
      this.errors.patientUHID = 'UHID is required';
    } else if (!/^PAT-\d{6}$/.test(this.form.patientUHID)) {
      this.errors.patientUHID = 'Format must be PAT-260001';
    }

    // EXISTING LOGIC (UNCHANGED)
    if (!this.form.deptName) {
      this.errors.deptName = 'Department required';
    }

    if (!this.form.doctorEmployeeId) {
      this.errors.doctorEmployeeId = 'Doctor ID required';
    }

    // ✅ DATE VALIDATION (TODAY → NEXT 2 MONTHS)
    if (!this.form.appointmentDate) {
      this.errors.appointmentDate = 'Date required';
    } else {
      const selected = new Date(this.form.appointmentDate);
      const min = new Date(this.minDate);
      const max = new Date(this.maxDate);

      if (selected < min || selected > max) {
        this.errors.appointmentDate = 'Date must be within next 2 months';
      }
    }

    if (!this.form.timeslot.start) {
      this.errors.start = 'Start time required';
    }

    if (!this.form.timeslot.end) {
      this.errors.end = 'End time required';
    }

    if (this.form.timeslot.start && this.form.timeslot.end) {
      if (this.form.timeslot.start >= this.form.timeslot.end) {
        this.errors.time = 'End time must be after start time';
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  submit() {

  if (!this.form.timeslot) {
    alert("Select time slot");
    return;
  }

  const payload = {
    ...this.form,
    timeslot: {
      start: this.form.timeslot.start,
      end: this.form.timeslot.end
    }
  };

  this.service.createAppointment(payload).subscribe({
    next: () => {
      alert("Appointment Created Successfully");
      this.closePopup();
      this.refresh.emit();
    },
    error: (err) => alert(err.error.message)
  });
}

  closePopup() {
    this.close.emit();
  }
}