import { Component, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  template: `
  <div class="popup-backdrop">
    <div class="popup">
      <h3>{{ message }}</h3>

      <button (click)="yes.emit()">Yes</button>
      <button (click)="no.emit()">No</button>
    </div>
  </div>
  `
})
export class ConfirmPopup {
  @Input() message = '';
  @Output() yes = new EventEmitter();
  @Output() no = new EventEmitter();
}