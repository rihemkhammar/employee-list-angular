import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  page = 1;
  pageSize = 10;
  totalElements = 0;
  sortColumn = 'id';
  sortDirection = 'asc';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.totalElements = data.length;
    });
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.employees.sort((a: any, b: any) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      return a[column] > b[column] ? direction : -direction;
    });
  }

  get paginatedEmployees() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.employees.slice(start, end);
  }
}