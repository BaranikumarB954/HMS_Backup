import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFound {

  constructor(private location: Location, private router: Router) {}

  goBack() {
    if (history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}