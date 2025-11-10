import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {


 constructor(private router: Router) {}

  goToTenantCreate() {
    this.router.navigate(['/tenant-create']);}

     go() {
    this.router.navigate(['/tenant-details']);
}
}

