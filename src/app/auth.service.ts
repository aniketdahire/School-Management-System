import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  //save token (after successfull login)
  setToken(token: string): void{
    localStorage.setItem("Angular18Local",token)
  }


  //get token (for checking if logged in)
  getToken(): string | null {
    return localStorage.getItem("Angular18Local")
  }

  //check if user is logged in 
  isLoggedIn(): boolean{
    return !!this.getToken(); //true if token exits
  }

  //logut user 
  logout(): void{
    localStorage.removeItem("Angular18Local");
    this.router.navigate(["/login"])// redirect to login 
  }
}


