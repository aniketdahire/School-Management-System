import { Component } from '@angular/core';
import { getStudent, signup, student } from '../../model/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule ,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  Signup:signup={
    name:'',
    email:'',
    password:null,
    role:'',
    phone:null

  }

  //to route
  constructor(private router: Router){

  }

  onSubmit(form:NgForm){
      const isLocalData = localStorage.getItem("Angular18Local");
    if (isLocalData != null){
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.Signup);
      localStorage.setItem("Angular18Local",JSON.stringify(localArray));
    
      
    }else{
      const localArray = [];
      localArray.push(this.Signup);
      localStorage.setItem("Angular18Local",JSON.stringify(localArray));
      
    }
    this.router.navigateByUrl('login')
    alert("Registraion Success!")
    form.resetForm();
  }


}
