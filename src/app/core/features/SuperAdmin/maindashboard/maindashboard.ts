import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maindashboard',
  imports: [],
  templateUrl: './maindashboard.html',
  styleUrl: './maindashboard.css',
})
export class Maindashboard {
 currentYear = new Date().getFullYear();
  
   constructor(private router: Router) {}

  logout() {
    console.log('Logout clicked');
  }

  openTenants()  
  {this.router.navigate(['/dashboard'])}


  openUsers() {
    console.log('User Management opened');
  }
}
