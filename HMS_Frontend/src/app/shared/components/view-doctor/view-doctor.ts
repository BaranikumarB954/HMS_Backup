import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-doctor.html',
  styleUrls: ['./view-doctor.css']
})
export class ViewDoctor {

  @Input() data: any;
  @Output() close = new EventEmitter();

  closePopup() {
    this.close.emit();
  }
}