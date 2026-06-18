import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OwnerAdminService } from '../../../../../services/ownerServices/owner-admin-service';
import { CommonModule } from '@angular/common';
import { AddAdmin } from '../../../../../shared/components/owner/add-admin/add-admin';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-owner-admin',
  standalone: true,
  imports: [CommonModule, AddAdmin, MatIconModule],
  templateUrl: './owner-admin.html',
  styleUrls: ['./owner-admin.css'],
})
export class OwnerAdmin implements OnInit {

  admins: any[] = [];

  showAddPopup = false;
  showEditPopup = false;

  selectedAdmin: any = null;

  constructor(private service: OwnerAdminService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.service.getAdmins().subscribe(res => {
      this.admins = res.data;
       
      this.cd.detectChanges();
    });
  }

  openAdd() {
    this.selectedAdmin = null;
    this.showAddPopup = true;
    this.showEditPopup = false;
  }

  openEdit(admin: any) {
     

    this.selectedAdmin = {
      ...admin,
      deptName: admin.department
    };

    this.showEditPopup = true;
    this.showAddPopup = false;
  }

  closePopup() {
    this.showAddPopup = false;
    this.showEditPopup = false;
    this.selectedAdmin = null;
  }

  deleteAdmin(userId: string) {
    if (confirm("Are you sure to delete?")) {
      this.service.deleteAdmin(userId).subscribe(() => {
        this.loadAdmins();
      });
    }
  }

  toggle(userId: string) {
    if (confirm("Change status?")) {
      this.service.toggleStatus(userId).subscribe(() => {
        this.loadAdmins();
      });
    }
  }

  refresh() {
    this.closePopup();
    this.loadAdmins();
  }
}