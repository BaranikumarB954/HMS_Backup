import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../services/patientService/patient-service';
import { CommonModule } from '@angular/common';
import { AddPatient } from '../../../../shared/components/addPatient/add-patient/add-patient';
import { ViewPatient } from '../../../../shared/components/receptionist/viewPatient/view-patient/view-patient';
import { NoDataComponent } from '../../../../shared/components/common/noData/no-data/no-data';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reception-patients',
  standalone: true,
  imports: [CommonModule , NoDataComponent, MatIconModule],
  templateUrl: './reception-patients.html',
  styleUrl: './reception-patients.css',
})
export class ReceptionPatients implements OnInit {
  patients: any[] = [];

  showAddModal = false;
  showViewModal = false;

  selectedPatient: any = null;
  isEditMode = false;

  constructor(
    private patientService: PatientService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (res) => {
        this.patients = res.data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openModal() {
    this.isEditMode = false;
    this.selectedPatient = null;
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
  }

  onPatientAdded() {
    this.showAddModal = false;
    this.loadPatients();
  }

 

  viewPatient(p: any) {
    this.selectedPatient = p;
    this.showViewModal = true;
  }

  editPatient(p: any) {
    this.selectedPatient = p;
    this.isEditMode = true;
    this.showAddModal = true;
  }

  deletePatient(p: any) {
    if (confirm('Are you sure to delete this patient?')) {
      this.patientService.deletePatient(p.patientId).subscribe(() => {
        this.loadPatients();
      });
    }
  }

  toggleStatus(p: any) {
    this.patientService.toggleStatus(p.userId).subscribe(() => {
      this.loadPatients();
    });
  }
}