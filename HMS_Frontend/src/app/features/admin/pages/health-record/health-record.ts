import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HealthRecordService } from '../../../../services/healthRecordService/health-record-service';
import { AddHealthRecord } from '../../../../shared/components/add-health-record/add-health-record';

@Component({
  selector: 'app-health-record',
  standalone: true,
  imports: [
    CommonModule,
    AddHealthRecord
  ],
  templateUrl: './health-record.html',
  styleUrls: ['./health-record.css']
})
export class HealthRecordComponent implements OnInit {

  // Signals
  healthRecords = signal<any[]>([]);
  showPopup = signal(false);
  isView = signal(false);
  selectedRecord = signal<any | null>(null);

  constructor(
    private healthRecordService: HealthRecordService
  ) {}

  ngOnInit(): void {
    this.loadHealthRecords();
  }

  loadHealthRecords(): void {

  this.healthRecordService.getAll().subscribe({
    next: (res: any) => {
      console.log(res);
      console.log(res.data);

      this.healthRecords.set(res.data);
    },
    error: (err) => {
      console.error(err);
    }
  });

}

  openPopup(record?: any,mode:'add' | 'edit' | 'view'='add'): void {
    this.selectedRecord.set(record || null);
    this.isView.set(mode === 'view');
    this.showPopup.set(true);
  }

  closePopup(): void {
    this.selectedRecord.set(null);
    this.showPopup.set(false);
  }

  onSaved(): void {
    this.closePopup();
    this.loadHealthRecords();
  }

  delete(recordId: string): void {

    const ok = confirm(
      'Are you sure you want to delete this Health Record?'
    );

    if (!ok) return;

    this.healthRecordService.delete(recordId).subscribe({
      next: () => {
        this.loadHealthRecords();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}