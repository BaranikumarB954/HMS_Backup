import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { DoctorService } from '../../../services/doctorService/doctor-service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.html',
  styleUrls: ['./add-doctor.css']
})
export class AddDoctor implements OnInit {

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() editData: any;

  isEditMode = false;

  doctorForm!: FormGroup;

  editEmpId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {

    this.initForm();

    // 🔥 Trim leading spaces automatically
    this.doctorForm.valueChanges.subscribe(values => {
      Object.keys(values).forEach(key => {
        const control = this.doctorForm.get(key);

        if (
          control &&
          typeof control.value === 'string' &&
          control.value !== control.value.trimStart()
        ) {
          control.setValue(control.value.trimStart(), {
            emitEvent: false
          });
        }
      });
    });

    if (this.editData) {
      this.isEditMode = true;

      this.editEmpId = this.editData.employeeId;

      if (this.editData.joiningDate) {
        this.editData.joiningDate =
          this.editData.joiningDate.split('T')[0];
      }

      this.doctorForm.patchValue(this.editData);

      this.doctorForm.get('email')?.disable({ emitEvent: false });

      this.doctorForm.get('password')?.clearValidators();
      this.doctorForm.get('password')?.updateValueAndValidity();
    }
  }

  initForm() {

    const today = new Date();

    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);

    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);

    this.doctorForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^(?!\s*$)[A-Za-z]+(?:\s[A-Za-z]+)*$/)
          ]
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(/^(\.[A-Za-z]+|[A-Za-z]+)$/)
          ]
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?!\.)(?!.*\.\.)([a-z0-9]{6,30}(\.[a-z0-9]+)*)(\+[a-z0-9]+)?@gmail\.com$/)
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
            this.dateRangeValidator(minDate, maxDate)
          ]
        ],

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
          Validators.required
        ],

        avlblEndTime: [
          '',
          Validators.required
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
      },
      {
        validators: this.timeValidator
      }
    );
  }

  // 🔥 Joining date must be within ±2 months
  dateRangeValidator(min: Date, max: Date) {
    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      if (!control.value) {
        return null;
      }

      const selectedDate = new Date(control.value);

      if (
        selectedDate < min ||
        selectedDate > max
      ) {
        return {
          invalidDateRange: true
        };
      }

      return null;
    };
  }

  // 🔥 Start time must be less than end time
  timeValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {

    const start =
      control.get('avlblStartTime')?.value;

    const end =
      control.get('avlblEndTime')?.value;

    if (!start || !end) {
      return null;
    }

    if (start >= end) {
      return {
        invalidTime: true
      };
    }

    return null;
  };

  submit() {

    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    const payload = this.doctorForm.getRawValue();

    if (this.isEditMode) {
      delete payload.password;
    }

    console.log("Payload before submission:", payload);
    const request = this.isEditMode
      ? this.doctorService.updateDoctor(
          this.editEmpId!,
          payload
        )
      : this.doctorService.addDoctor({
          ...payload,
          roleName: 'DOCTOR'
        });

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
    return this.doctorForm.controls;
  }
}