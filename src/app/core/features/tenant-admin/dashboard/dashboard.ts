import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  
})
export class Dashboard {
 private router = inject(Router);
  goToCreateUser() {
    this.router.navigate(['/users-create']);
  }
}
