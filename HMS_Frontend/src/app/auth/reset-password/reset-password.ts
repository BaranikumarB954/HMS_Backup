import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  token = this.route.snapshot.paramMap.get('token') || '';
  message = '';
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit() {
    this.auth.resetPassword(this.token, this.form.value).subscribe({
      next: () => {
        this.message = "Password updated successfully";
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || "Reset failed";
      }
    });
  }
}