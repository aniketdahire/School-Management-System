import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  //save token (after successfull login)
  setToken(token: string): void {
    localStorage.setItem('Angular18Local', token);
  }

  //get token (for checking if logged in)
  getToken(): string | null {
    return localStorage.getItem('Angular18Local');
  }

  //check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); //true if token exits
  }

  // logout user
  logout(): void {
    // get existing data
    const storedData = localStorage.getItem('Angular18Local');

    if (storedData) {
      let parsedData = JSON.parse(storedData);

      // add/update logout key
      parsedData.isLoggedIn = false;

      // save it back to localStorage
      localStorage.setItem('Angular18Local', JSON.stringify(parsedData));
    } else {
      // if nothing exists, just create one
      localStorage.setItem(
        'Angular18Local',
        JSON.stringify({ isLoggedIn: false })
      );
    }

    // redirect to login
    this.router.navigate(['/login']);
  }
}
