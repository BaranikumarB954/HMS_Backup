import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../../services/patientService/patient-service';
import { AddPatient } from '../../../../shared/components/addPatient/add-patient/add-patient';

@Component({
  selector: 'app-patient',
  standalone:true,
  imports: [CommonModule,AddPatient],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class AdminPatient implements OnInit{
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
