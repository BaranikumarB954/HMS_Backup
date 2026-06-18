import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../services/patientService/patient-service';
import { CommonModule } from '@angular/common';
import { AddPatient } from '../../../../shared/components/addPatient/add-patient/add-patient';

@Component({
  selector: 'app-doctor-patient',
  imports: [CommonModule,AddPatient],
  templateUrl: './doctor-patient.html',
  styleUrl: './doctor-patient.css',
})
export class DoctorPatient implements OnInit{
  patients: any[] = [];
  showAddModal = false;

  constructor(private patientService: PatientService, private cd :ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (res) => {
        this.patients = res.data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
  }

  onPatientAdded() {
    this.showAddModal = false;
    this.loadPatients(); // 🔥 refresh after add
  }
}
