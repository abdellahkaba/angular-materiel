import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from "@angular/router";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit {
 public formStudent!: FormGroup;

  constructor(
    private router: Router,
    private service: StudentService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formStudent = this.fb.group({
      code: '',
      firstName: '',
      lastName: '',
      email: '',
    })
  }
  ngOnInit(): void {
    this.formStudent.patchValue(this.data)
  }

  onSubmit() {
    if (this.formStudent.valid) {
      if (this.data) {
        this.service
          .updateStudent(this.data.id, this.formStudent.value)
          .subscribe({
            next: (val: any) => {
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            }
          });
      }else {
        this.service
          .addStudent(this.formStudent.value)
          .subscribe({
            next: (val: any) => {
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            }
          })
      }
    }
  }
}
