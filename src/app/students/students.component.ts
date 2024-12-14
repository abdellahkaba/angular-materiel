import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {StudentService} from "../services/student.service";
import {AddStudentComponent} from "../add-student/add-student.component";
import {Observable} from "rxjs";
import {Student} from "../model/student.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit {

  public students! : Observable<Array<Student>>
  public dataSource : any
  public displayedColumns : string[] = ['id', 'firstName', 'lastName', 'email','payment']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: StudentService,
  ) {
  }


  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe({
      next: (val) => {
        this.dataSource = new MatTableDataSource(val)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error: console.log
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.toString();
  }

  getPayment(student: any) {
    this.router.navigateByUrl('/admin/payments')
  }

  openAddEditDialog() {
    const dialogRef = this.dialog.open(AddStudentComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ngOnInit()
        }
      }
      }
    )
  }
}
