import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwnerAdminService } from '../../../../services/ownerServices/owner-admin-service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-admin.html',
  styleUrls: ['./add-admin.css']
})
export class AddAdmin implements OnChanges {

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();

  @Input() editData: any = null;

  form: any = {};

  errors: any = {};

validateForm() {
  this.errors = {};

  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!this.form.firstName || !nameRegex.test(this.form.firstName)) {
    this.errors.firstName = 'Min 2 letters required';
  }

  if (!this.form.lastName || !nameRegex.test(this.form.lastName)) {
    this.errors.lastName = 'Min 2 letters required';
  }

  if (!this.form.email || !gmailRegex.test(this.form.email)) {
    this.errors.email = 'Enter valid Gmail';
  }

  if (!this.form.phone || !phoneRegex.test(this.form.phone)) {
    this.errors.phone = 'Enter valid 10-digit Indian number';
  }

  if (!this.editData) {
    if (!this.form.password || this.form.password.length < 6) {
      this.errors.password = 'Min 6 characters';
    }
  }

  if (!this.form.deptName) {
    this.errors.deptName = 'Department required';
  }

  if (!this.form.designation) {
    this.errors.designation = 'Designation required';
  }

  if (!this.form.joiningDate) {
    this.errors.joiningDate = 'Joining date required';
  }

  return Object.keys(this.errors).length === 0;
}

  constructor(private adminService: OwnerAdminService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']) {

      if (this.editData) {
        const data = { ...this.editData };
         
         
 
        if (data.joiningDate) {
          data.joiningDate = data.joiningDate.split('T')[0];
        }

        this.form = data;
      } else {
 
        this.form = {};
      }
    }
  }

  submit() {

  if (!this.validateForm()) return;

  const payload = { ...this.form };

  const request = this.editData
    ? this.adminService.updateAdmin(this.editData.userId, payload)
    : this.adminService.addAdmin(payload);

  request.subscribe({
    next: () => {
      this.refresh.emit();
      this.closePopup();
    },
    error: err => console.error(err)
  });
}

  closePopup() {
    this.close.emit();
  }
}