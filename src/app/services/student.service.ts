import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }
  getAllStudents(): Observable<Array<Student>> {
    return this.http.get<Array<Student>>('http://localhost:8082/api/v1/student')
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('http://localhost:8082/api/v1/student', student)
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.http.put('http://localhost:8082/api/v1/student', data)
  }
}
