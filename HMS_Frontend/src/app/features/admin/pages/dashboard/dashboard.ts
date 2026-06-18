import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard implements OnInit {

  data: any = {
    totalEmployees: 0,
    totalAppointments: 0,
    totalApprovals: 0
  };

  constructor(private http: HttpClient,private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any>('/api/admin/dashboard').subscribe({
      next: (res) => {
        this.data = res.data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("Dashboard load failed", err);
      }
    });
  }
}