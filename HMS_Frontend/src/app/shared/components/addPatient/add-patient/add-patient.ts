import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../../services/patientService/patient-service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.html',
  styleUrls: ['./add-patient.css']
})
export class AddPatient implements OnInit {

  @Output() patientAdded = new EventEmitter<void>();
  @Input() editData: any;
  @Input() isEditMode: boolean = false;

  genders: string[] = [];
  bloodGroups: string[] = [];

  patientForm!: any;

  minDob: string = '';
  maxDob: string = '';

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    const today = new Date();
    const min = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    this.minDob = min.toISOString().split('T')[0];
    this.maxDob = today.toISOString().split('T')[0];

    this.initForm();

    this.patientService.getMeta().subscribe({
      next: (res) => {
        this.genders = res.data.genders;
        this.bloodGroups = res.data.bloodGroups;
      }
    });

    if (this.isEditMode && this.editData) {
      this.patientForm.patchValue(this.editData);

      this.patientForm.get('password')?.clearValidators();
      this.patientForm.get('password')?.updateValueAndValidity();
    }
  }

  initForm() {
    this.patientForm = this.fb.group({

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
          Validators.pattern(/^(?!\s)[A-Za-z]+(?<!\s)$/)
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
          Validators.pattern(/^[6-9]\d{9}$/),
          Validators.maxLength(10)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],

      dob: ['', [Validators.required]],

      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-Za-z\s]+$/)
        ]
      ],

      state: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[A-Za-z\s]+$/)
        ]
      ],

      emgContName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^(?!\s)([A-Za-z]+(?:\s[A-Za-z]+)*)(?<!\s)$/)
        ]
      ],

      emgContPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  submit() {

    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const payload = this.patientForm.getRawValue();

    if (this.isEditMode) {
      delete payload.password;
    }

    if (this.isEditMode) {
      this.patientService.updatePatient(this.editData.patientId, payload)
        .subscribe(() => this.patientAdded.emit());
    } else {
      this.patientService.addPatient(payload)
        .subscribe(() => this.patientAdded.emit());
    }
  }

  get f() {
    return this.patientForm.controls;
  }
}