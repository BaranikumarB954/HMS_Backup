import { ChangeDetectorRef, Component } from '@angular/core';
import { DoctorService } from '../../../../services/doctorService/doctor-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {
  data: any;

  constructor(private service: DoctorService, private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.service.getDashboard().subscribe((res: any) => {
      this.data = res.data;
      this.cd.detectChanges();
       
    });
  }
}
