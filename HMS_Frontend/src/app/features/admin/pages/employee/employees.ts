import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employeeService/employee-service';
import { AddEmployee } from '../../../../shared/components/add-employee/add-employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, AddEmployee],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class AdminEmployees implements OnInit {

  employees: any[] = [];
  showPopup = false;
  selectedEmployee: any = null;

  constructor(
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res.data;
      this.cd.detectChanges();
    });
  }

 
  openPopup(employee?: any) {
    this.showPopup = true;
    this.selectedEmployee = employee || null;
  }

  closePopup() {
    this.showPopup = false;
  }

  onEmployeeAdded() {
    this.closePopup();
    this.loadEmployees();
  }

  toggle(userId: string) {
    this.employeeService.toggleStatus(userId).subscribe(() => {
      this.loadEmployees();
    });
  }
}