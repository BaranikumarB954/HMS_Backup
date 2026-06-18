import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './no-data.html',
  styleUrls: ['./no-data.css']
})
export class NoDataComponent {
  @Input() message: string = 'No records found';
  @Input() subMessage: string = '';
}