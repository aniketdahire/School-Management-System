import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseOneStud, getStudent, student } from '../model/interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  //getAllstudent 
  getAllStudent():Observable<getStudent[]>{
    return this.http.get<getStudent[]>(`https://localhost:7117/api/Students`)
  }

  //Post | addStudent
  addStudent(stud:student):Observable<student>{
    return this.http.post<student>(`https://localhost:7117/api/Students`,stud)
  }

  //getStudentById
  getStudentById(id:number):Observable<ApiResponseOneStud>{
    return this.http.get<ApiResponseOneStud>(`https://localhost:7117/api/students/${id}`)
  }

  //deleteStudent
  deleteStudent(id:number):Observable<getStudent>{
    return this.http.delete<getStudent>(`https://localhost:7117/api/students/${id}`)
  }

  //Put | updateStudent
  updateStudent(stud:getStudent,id:number):Observable<getStudent>{
    return this.http.put<getStudent>(`https://localhost:7117/api/students/${id}`,stud)
  }
}
