import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { getStudent, student } from '../../model/interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'bootstrap';
import { delay } from 'rxjs';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  // Inject StudentService
  private studentService = inject(StudentService);

  // Student list
  arr: getStudent[] = [];

  // Models for add/edit/view/delete
  newStudent: student = { name: '', course: '', fees: null };
  editStudent: getStudent | null = null;
  deleteStudent: getStudent | null = null;
  viewStudentData: getStudent | null = null;

  //toast 
  toastMessage: string = '';
  @ViewChild('successToast',{static:false}) successToast!: ElementRef;

  ngOnInit(): void {
    this.getAllStudents();
  }


  //show toast method 
  showToast(message: string){
    this.toastMessage = message;
    if (this.successToast){
    const toastEl: any = this.successToast.nativeElement;
    const bsToast = new Toast(toastEl,{delay:4000});
    bsToast.show();
    } else{
      console.log("toast element not found!")
    }
  }

  // Fetch all students
  getAllStudents() {
    this.studentService.getAllStudent().subscribe({
      next: (res: getStudent[]) => {
        this.arr = res;
      },
      error: (err) => console.error('Error fetching students:', err),
    });
  }

  // Add new student
  addStudent() {
    if (!this.newStudent.name || !this.newStudent.course || this.newStudent.fees == null) {
      this.showToast('All fields are required!');
      return;
    }

    this.studentService.addStudent(this.newStudent).subscribe({
      next: () => {
        this.showToast('Student Added Successfully!')
        this.getAllStudents();
        this.newStudent = { name: '', course: '', fees: null }; // reset form
      },
      error: (err) => console.error('Error adding student:', err),
    });
  }

  // Open edit modal
  openEditModal(stud: getStudent) {
    this.editStudent = { ...stud }; // copy student data
  }

  //  Apply edit
  applyEdit() {
    if (this.editStudent && this.editStudent.id !== null) {
      this.studentService.updateStudent(this.editStudent, this.editStudent.id).subscribe({
        next: () => {
          this.showToast('Student Updated!');
          this.getAllStudents();
          this.editStudent = null; // reset after update
        },
        error: (err) => console.error('Error updating student:', err),
      });
    }
  }

  //  Open delete modal
  openDeleteModal(stud: getStudent) {
    this.deleteStudent = stud;
  }

  //  Confirm delete
  confirmDelete() {
    if (this.deleteStudent?.id) {
      this.studentService.deleteStudent(this.deleteStudent.id).subscribe({
        next: () => {
          this.showToast('Deleted Student!');
          this.getAllStudents();
          this.deleteStudent = null;
        },
        error: (err) => console.error('Error deleting student:', err),
      });
    }
  }

  //  Open view modal
  openViewModal(stud: getStudent) {
    this.viewStudentData = stud;
  }
}
