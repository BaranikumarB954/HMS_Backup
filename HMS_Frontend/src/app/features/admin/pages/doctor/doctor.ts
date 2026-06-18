import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDoctor } from '../../../../shared/components/add-doctor/add-doctor';
import { DoctorService } from '../../../../services/doctorService/doctor-service';
import { ViewDoctor } from '../../../../shared/components/view-doctor/view-doctor';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, AddDoctor, ViewDoctor],
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css']
})
export class AdminDoctor implements OnInit {

  doctors: any[] = [];
  showPopup = false;
  editData: any = null;

  viewData: any = null;

  constructor(private doctorService: DoctorService , private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = res.data;
      this.cd.detectChanges();
    });
  }


  openView(doc: any) {
    this.viewData = doc;
  }

  openPopup() {
    this.editData = null; // 🔥 create mode
    this.showPopup = true;
  }

  openEdit(doc: any) {
    this.editData = doc; // 🔥 edit mode
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  onUpdated() {
    this.closePopup();
    this.loadDoctors();
  }
}