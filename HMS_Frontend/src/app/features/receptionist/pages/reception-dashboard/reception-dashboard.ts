import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionDashboardService } from '../../../../services/receptionService/reception-dashboard-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reception-dashboard',
  imports: [CommonModule],
  templateUrl: './reception-dashboard.html',
  styleUrl: './reception-dashboard.css',
})
export class ReceptionDashboard implements OnInit{
   dashboardData: any;

  constructor(private receptionistService: ReceptionDashboardService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.receptionistService.getDashboardData().subscribe({
      next: (res: any) => {
        this.dashboardData = res.data;
        console.log("Dashboard Data:", this.dashboardData);
        this.cd.detectChanges()
      },
      error: (err) => {
        console.error('Dashboard error:', err);
      }
    });
  }
}
