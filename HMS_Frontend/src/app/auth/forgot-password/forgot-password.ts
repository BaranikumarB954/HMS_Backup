import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // ✅ add this
import { AuthService } from '../../services/authService/auth';
import { CommonModule } from '@angular/common'; // ✅ also recommended

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule], // ✅ ADD THIS LINE
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {

  message = '';
  error = '';

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    this.auth.forgotPassword(this.form.value.email!).subscribe({
      next: () => {
        this.message = "Reset link sent to your email";
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || "Something went wrong";
      }
    });
  }
}