import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashBoardService/dashboard';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,Sidebar,Header],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {

  menus: any[] = [];
  loading: boolean = true;

  expandedMenu: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.loading = true;

    this.dashboardService.getMenus().subscribe({
      next: (res: any) => {

  let menus = res.data;

  const role = localStorage.getItem('role');

 
  if (role === 'OWNER') {
    menus = menus.filter((m: any) => m.name !== 'Doctor');
  }

  this.menus = [...menus]; // ✅ trigger OnPush
  this.loading = false;
  this.cdr.detectChanges();
},
      error: (err) => {
        console.error("Menu error:", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

toggleMenu(menuId: string) {
  this.expandedMenu = this.expandedMenu === menuId ? null : menuId;
  this.cdr.detectChanges();
}

  
  
}