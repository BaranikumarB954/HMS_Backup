import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ROLE_ROUTE_MAP } from '../../core/constants/role-route.map';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;

  backendError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  onLogin() {
    this.backendError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {

        const token = res.data?.token || res.token;
        const role = res.data?.roleName || res.roleName;
        const permissions = res.data?.permissions || res.permissions;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('permissions', JSON.stringify(permissions));

        const route = ROLE_ROUTE_MAP[role] || '/auth/login';
        this.router.navigate([`/app${route}/dashboard`]);
      },

      error: (err) => {
        this.backendError = err.error?.message || "❌ Invalid credentials";
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}