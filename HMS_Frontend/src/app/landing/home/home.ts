import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
}
