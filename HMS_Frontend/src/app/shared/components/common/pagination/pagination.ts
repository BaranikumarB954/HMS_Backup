import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class PaginationComponent {

  @Input() page = 1;
  @Input() totalPages = 1;
  @Input() limit = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  next() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  prev() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }
}