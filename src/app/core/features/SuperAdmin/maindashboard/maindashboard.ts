import { Component } from '@angular/core';

@Component({
  selector: 'app-maindashboard',
  imports: [],
  templateUrl: './maindashboard.html',
  styleUrl: './maindashboard.css',
})
export class Maindashboard {
 currentYear = new Date().getFullYear();

  logout() {
    console.log('Logout clicked');
  }

  openTenants() {
    console.log('Tenant Management opened');
  }

  openUsers() {
    console.log('User Management opened');
  }
}
