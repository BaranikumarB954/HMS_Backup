import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  user: any = null;
  loading = true;

  constructor(private http: HttpClient, private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any>('api/user/profile').subscribe({
      next: (res) => {
        this.user = res.data;
        this.loading = false;
         
        this.cd.detectChanges()
      },
      error: (err) => {
        this.loading = false;
        console.error("Failed to load profile", err);
      }
    });
  }

  isDoctor() {
    return this.user?.roleName === 'DOCTOR';
  }

  isAdmin() {
    return this.user?.roleName === 'ADMIN';
  }

  isOwner() {
    return this.user?.roleName === 'OWNER';
  }
}