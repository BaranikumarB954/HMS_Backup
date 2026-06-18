import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-patient.html',
  styleUrls: ['./view-patient.css']
})
export class ViewPatient {

  @Input() patient: any;
  @Output() close = new EventEmitter<void>();

}