import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-us.html',
  styleUrls: ['./join-us.css'],
})
export class JoinUs {

  email: string = '';
  message: string = '';
  showResendButton: boolean = false;

 
  emailTouched: boolean = false;
  emailError: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

 
  isGmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  }

  proceed() {

    this.message = '';
    this.showResendButton = false;
    this.emailTouched = true;
    this.emailError = '';

 
    if (!this.email) {
      this.emailError = "Email is required";
      return;
    }

 
    if (!this.isGmail(this.email)) {
      this.emailError = "Only Gmail (@gmail.com) is allowed";
      return;
    }

 
    this.http.post<any>('api/join-us', { email: this.email })
      .subscribe({
        next: (res) => {

          const data = res.data;
          const status = data.status;
          const message = data.message || "";

          switch (status) {

            case 'NEW':
              this.router.navigate(['/register'], {
                queryParams: { email: this.email }
              });
              break;

            case 'NOT_VERIFIED':
              this.message = `Email not verified for ${data.userEmail}`;
              this.showResendButton = true;
              this.cd.detectChanges();
              break;

            case 'EXISTS':
              this.message = message;
              this.cd.detectChanges();
              break;

            case 'PENDING':
              this.message = message;
              this.showResendButton = false;
              this.cd.detectChanges();
              break;

            case 'APPROVED':
              this.message = message;
              this.cd.detectChanges();
              break;

            case 'REJECTED':
              this.message = message;
              this.cd.detectChanges();
              break;

            default:
              this.message = "Unknown status received.";
              this.cd.detectChanges();
          }

        },
        error: () => {
          this.message = "Something went wrong. Please try again.";
        }
      });
  }

 
  resendEmail() {
    this.http.post<any>('api/register-approval/resend-verification', {
      email: this.email
    }).subscribe({
      next: () => {
        this.message = "Verification email sent again. Please check your inbox.";
        this.showResendButton = false;
      },
      error: () => {
        this.message = "Failed to resend email.";
      }
    });
  }
}