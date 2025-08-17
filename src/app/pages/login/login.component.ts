import { Component, inject, Inject } from '@angular/core';
import { login } from '../../model/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { StudentComponent } from '../student/student.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule ,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login: login = {
    email: '',
    password: '',
    role: '',
  };

  http = inject(HttpClient);

  //constructor for router
  constructor(private router: Router) {}

  // onLogin() {
  // debugger;
  // this.http
  //   .post('https://freeapi.miniprojectideas.com/api/User/Login', this.login)
  //   .subscribe((res: any) => {
  //     console.log("res",res)
  //     // debugger
  //     if (res.result) {

  //       alert('Login Success!');
  //       localStorage.setItem("Angular18Local",this.login.EmailId )
  //       this.router.navigateByUrl('student')
  //     } else {
  //       alert('Invalid Name or Passowrd!');
  //     }
  //   });

  // this.http.get('https://mocki.io/v1/eba66eb0-b106-4afa-be4b-547f29019ad9').subscribe((res:any)=>{
  //   console.log(res)
  // })

  // onLogin(form:NgForm){
  //   this.http.post(`https://localhost:7117/api/Students`,this.Login).subscribe((res:any)=>{
  //     if(res.result){
  //       this.router.navigateByUrl('student');
  //     }else{
  //       alert('invalid username or passowrd')
  //     }
  //   })
  // }}
  onLogin(form: NgForm) {
    const isLocalData = localStorage.getItem('Angular18Local');
    this.login = form.value;

    
    if (isLocalData != null) {
      
      const users = JSON.parse(isLocalData);
      console.log('stored user',users);
      

      const isUserFound = users.find((m: login) => {
        console.log('Entered Email:', this.login.email);
        console.log('Entered Role:', this.login.role);
        console.log('Entered Password:', this.login.password);

        return (
          m.email === this.login.email &&
          m.password === this.login.password &&
          m.role === this.login.role
        );
      });

      console.log(isUserFound);

      if (isUserFound != undefined) {
        if (this.login.role == 'Student') this.router.navigateByUrl('student');
        else if (this.login.role == 'Admin') this.router.navigateByUrl('admin');
        else if (this.login.role == 'Teacher')
          this.router.navigateByUrl('teacher');
      } else {
        alert('Username or Password or role is Wrong');
      }
    } else {
      alert('NO User Found!');
    }
  }
}
