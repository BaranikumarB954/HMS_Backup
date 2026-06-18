import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  departments: any[] = [];
  filteredDepartments: any[] = [];
  roleDeptMap: any = {};

  genders: string[] = [];
  bloodGroups: string[] = [];
  roles: any[] = [];

  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cd:ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {

 
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],

      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      lastName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/)
      ]],

      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      ]],

      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],

      roleName: ['', Validators.required],
      deptName: [''],

      designation: ['', Validators.required],

      joiningDate: ['', Validators.required],

 
      medRegNo: [''],
      specialization: ['', [Validators.pattern(/^[A-Za-z\s]+$/)]],
      qualification: [''],
      consultationFee: [''],
      avlblStartTime: ['', [Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      avlblEndTime: ['', [Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      expYears: ['']
    });
  }

 

 
 
 
 
 

 
 
 

 

 
 

 
 

 
 
 
 
 

  ngOnInit() {

  this.route.queryParams.subscribe(params => {

    const emailFromUrl = params['email'] || '';

    if (emailFromUrl) {
      this.registerForm.get('email')?.setValue(emailFromUrl);
    }

  });

 
  this.http.get<any>('api/meta')
    .subscribe(res => {

      const data = res.data;
      console.log("My meta data : ", data)

      this.departments = data.departments;
      this.roleDeptMap = data.roleDeptMap;

      this.genders = data.genders;
      this.bloodGroups = data.bloodGroups;

      this.roles = Object.values(data.roleNames).filter((role: any) =>
        !['OWNER', 'ADMIN', 'PATIENT'].includes(role.roleName)
      );
      this.cd.detectChanges();

    });
}

 
  onRoleChange() {

    const role = this.registerForm.value.roleName;

    const allowedDeptIds = this.roleDeptMap[role as string] || [];

    this.filteredDepartments = this.departments.filter(d =>
      allowedDeptIds.includes(d.deptId)
    );
  }

 
  submit() {

  this.message = '';
  this.error = '';

  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  let formValue = { ...this.registerForm.value };

  // ✅ CLEAN EMPTY VALUES (IMPORTANT FIX)
  Object.keys(formValue).forEach(key => {
    if (formValue[key] === "") {
      formValue[key] = null;
    }
  });

  // ✅ REMOVE DOCTOR FIELDS IF NOT DOCTOR
  if (formValue.roleName !== 'DOCTOR') {
    delete formValue.medRegNo;
    delete formValue.specialization;
    delete formValue.qualification;
    delete formValue.consultationFee;
    delete formValue.avlblStartTime;
    delete formValue.avlblEndTime;
    delete formValue.expYears;
  }

  console.log("Cleaned submission:", formValue);

  this.http.post<any>('api/register-approval/register', formValue)
    .subscribe({
      next: () => {
        this.message = "Registered successfully. Check your email for verification.";
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error("ERROR:", err);
        this.error = err.error?.message || "❌ Something went wrong";
      }
    });
}

 
  get email() { return this.registerForm.get('email'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
}