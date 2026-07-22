import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  input,
  signal
} from '@angular/core';
import { HealthRecordService } from '../../../services/healthRecordService/health-record-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-health-record',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-health-record.html',
  styleUrl: './add-health-record.css',
})
export class AddHealthRecord implements OnChanges{
  @Input() editData: any = null;
  @Input() isView = false;
  // isView = input(false)
  @Output() close = new EventEmitter<void>();

  @Output() refresh = new EventEmitter<void>();

  loading = signal(false);

  isEdit = signal(false);

  form = signal({

    appointmentId: '',

    symptoms: '',

    diagnosis: '',

    notes: '',

    isLabRequired: false,

    isRadiologyRequired: false,

    prescriptions: [
    {
      name: '',
      strength: '',
      timing: {
        morning: false,
        afternoon: false,
        night: false,
        foodTiming: 'AFTER_FOOD',
        durationDays: 1
      },
      instructions: ''
    }
  ]

  });

  constructor(
    private healthRecordService: HealthRecordService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (this.editData) {

      this.isEdit.set(true);

      this.form.set({

        appointmentId:
          this.editData.appointmentId?.appointmentId ??
          this.editData.appointmentId ??
          '',

        symptoms:
          this.editData.symptoms ?? '',

        diagnosis:
          this.editData.diagnosis ?? '',

        notes:
          this.editData.notes ?? '',

        isLabRequired:
          this.editData.isLabRequired ?? false,

        isRadiologyRequired:
          this.editData.isRadiologyRequired ?? false,

        prescriptions:

          this.editData.prescriptions?.length

            ? [...this.editData.prescriptions]

            : [
                {
                  name: '',
                  strength: '',
                  schedule: '',
                  foodTiming: 'AFTER_FOOD',
                  duration: 1,
                  instructions: ''
                }
              ]

      });

    } else {

      this.resetForm();

    }

  }

  addMedicine() {

    this.form.update(form => ({

      ...form,

      prescriptions: [

        ...form.prescriptions,

        {
          name: '',
          strength: '',
          timing: {
            morning: false,
            afternoon: false,
            night: false,
            foodTiming: 'AFTER_FOOD',
            durationDays: 1
          },
          instructions: ''
        }

      ]

    }));

  }

  removeMedicine(index: number) {

    this.form.update(form => ({

      ...form,

      prescriptions:

        form.prescriptions.filter((_, i) => i !== index)

    }));

  }

  save() {

    this.loading.set(true);

    if (this.isEdit()) {

      this.healthRecordService
        .update(this.editData._id, this.form())
        .subscribe({

          next: () => {

            this.loading.set(false);

            this.refresh.emit();

          },

          error: err => {

            console.error(err);

            this.loading.set(false);

          }

        });

    } else {

      this.healthRecordService
        .create(this.form())
        .subscribe({

          next: () => {

            this.loading.set(false);

            this.refresh.emit();

          },

          error: err => {

            console.error(err);

            this.loading.set(false);

          }

        });

    }

  }

  cancel() {

    this.close.emit();

  }

  resetForm() {

    this.isEdit.set(false);

    this.form.set({

      appointmentId: '',

      symptoms: '',

      diagnosis: '',

      notes: '',

      isLabRequired: false,

      isRadiologyRequired: false,

      prescriptions: [
        {
          name: '',
          strength: '',
          timing: {
            morning: false,
            afternoon: false,
            night: false,
            foodTiming: 'AFTER_FOOD',
            durationDays: 1
          },
          instructions: ''
        }
      ]

    });

  }

}
