import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../services/employeeService/employee-service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployee implements OnChanges {

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() editData: any;

  isEditMode = false;
  editUserId: string | null = null;

  employeeForm: FormGroup;

  today: string = '';
  maxDate: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {

    const today = new Date();

    // ✅ FULL RANGE (2 months before + 2 months after FULL MONTH)
    const min = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const max = new Date(today.getFullYear(), today.getMonth() + 3, 0);

    this.today = min.toISOString().split('T')[0];
    this.maxDate = max.toISOString().split('T')[0];

    this.employeeForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^(?!\s)([A-Za-z]+(?:\s[A-Za-z]+)*)(?<!\s)$/)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[A-Za-z]+$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      roleName: ['', Validators.required],

      designation: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]+$/)
        ]
      ],

      joiningDate: [
        '',
        [
          Validators.required,
          this.joiningDateValidator()
        ]
      ],

      // ✅ DOCTOR REQUIRED FIELDS (FIX)
      medRegNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9-]+$/),
          Validators.maxLength(16)
        ]
      ],

      specialization: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]+$/)
        ]
      ],

      qualification: [
        '',
        [
          Validators.required
        ]
      ],

      consultationFee: [
        '',
        [
          Validators.required,
          Validators.min(300),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],

      avlblStartTime: [
        '',
        [Validators.required] // ✅ FIX
      ],

      avlblEndTime: [
        '',
        [Validators.required] // ✅ FIX
      ],

      expYears: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(50),
          Validators.pattern(/^[0-9]+$/)
        ]
      ]

    }, {
      validators: [this.timeValidator()]
    });

    // ✅ force validation refresh
    this.employeeForm.get('avlblStartTime')?.valueChanges.subscribe(() => {
      this.employeeForm.updateValueAndValidity();
    });

    this.employeeForm.get('avlblEndTime')?.valueChanges.subscribe(() => {
      this.employeeForm.updateValueAndValidity();
    });
  }

  // ✅ TIME VALIDATOR
  timeValidator() {
    return (group: FormGroup) => {
      const start = group.get('avlblStartTime')?.value;
      const end = group.get('avlblEndTime')?.value;

      if (!start || !end) return null;

      if (start >= end) {
        return { invalidTime: true };
      }

      return null;
    };
  }

  // ✅ JOINING DATE VALIDATOR
  joiningDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const selected = new Date(control.value);
      const today = new Date();

      const min = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      const max = new Date(today.getFullYear(), today.getMonth() + 3, 0);

      selected.setHours(0, 0, 0, 0);
      min.setHours(0, 0, 0, 0);
      max.setHours(0, 0, 0, 0);

      if (selected < min || selected > max) {
        return { invalidJoiningDate: true };
      }

      return null;
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData'] && this.editData) {

      this.isEditMode = true;
      this.editUserId = this.editData.userId;

      const patched = { ...this.editData };

      if (patched.joiningDate) {
        patched.joiningDate = patched.joiningDate.split('T')[0];
      }

      this.employeeForm.patchValue(patched);

      this.employeeForm.get('email')?.disable();
      this.employeeForm.get('password')?.clearValidators();
      this.employeeForm.get('password')?.updateValueAndValidity();
    }
  }

  submit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched(); // ✅ triggers all errors
      return;
    }

    const formData = this.employeeForm.getRawValue();

    if (this.isEditMode) {
      delete formData.password;
    }

    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key] === null) {
        delete formData[key];
      }
    });

    const request = this.isEditMode
      ? this.employeeService.updateEmployee(this.editUserId!, formData)
      : this.employeeService.addEmployee(formData);

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

  get f() {
    return this.employeeForm.controls;
  }
}