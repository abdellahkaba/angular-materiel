import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit {

  public students : any
  public dataSource : any
  public displayedColumns : string[] = ['id', 'firstName', 'lastName', 'email','payment']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
  }


  ngOnInit(): void {
      this.students = []
    for (let i = 0; i < 10; i++) {
      this.students.push({
        id: i,
        firstName: Math.random().toString(20).substring(7),
        lastName: Math.random().toString(20).substring(7),
        email: Math.random().toString(20).substring(7) + '@gmail.com',
      })
    }
    this.dataSource = new MatTableDataSource(this.students)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.toString();
  }
}
