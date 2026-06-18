import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROLE_ROUTE_MAP } from '../../../core/constants/role-route.map';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  @Input() menus: any[] = [];
  @Input() expandedMenu: string | null = null;

  @Output() menuToggle = new EventEmitter<string>();

  toggle(menuId: string) {
    this.menuToggle.emit(menuId); // 🔥 send to parent
  }

  getRoutePath(path: string): string {
    const role = localStorage.getItem('role');

    const basePath = ROLE_ROUTE_MAP[role as keyof typeof ROLE_ROUTE_MAP];

    if (!basePath) return '/auth/login';

    return `/app${basePath}/${path}`;
  }
}