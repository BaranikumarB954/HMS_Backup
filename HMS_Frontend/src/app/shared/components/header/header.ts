import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  showDropdown = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goToProfile() {
    const role = localStorage.getItem('role')?.toLowerCase();
    this.router.navigate([`/app/${role}/profile`]);
    this.showDropdown = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}