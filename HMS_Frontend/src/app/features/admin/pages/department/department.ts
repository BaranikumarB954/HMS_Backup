import { ChangeDetectorRef, Component } from '@angular/core';
import { DepartmentService } from '../../../../services/departmentServices/department-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class AdminDepartment {

  employees: any[] = [];
  page = 1;
  limit = 5;
  totalPages = 1;
  selectedRole = 'ALL';

  constructor(private empService: DepartmentService, private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService
      .getDepartmentEmployees(this.page, this.limit, this.selectedRole)
      .subscribe(res => {
        this.employees = res.data.data;
        this.totalPages = res.data.pagination.totalPages;
        this.cd.detectChanges();
      });
  }

  changeRole(role: string) {
    this.selectedRole = role;
    this.page = 1;
    this.loadEmployees();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadEmployees();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadEmployees();
    }
  }
}