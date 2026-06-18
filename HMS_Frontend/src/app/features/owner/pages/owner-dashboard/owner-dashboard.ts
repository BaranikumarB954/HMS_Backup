 

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerDashboardService } from '../../../../services/ownerServices/owner-dashboard-service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-dashboard.html',
  styleUrls: ['./owner-dashboard.css']
})
export class OwnerDashboard implements OnInit {

  stats: any = {};

  constructor(private service: OwnerDashboardService, private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.service.getStats().subscribe(res => {
      this.stats = res.data;
      this.cd.detectChanges();
    });
  }
}