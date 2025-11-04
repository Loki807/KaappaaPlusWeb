import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
router = inject(Router);

  // 🧭 Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
}
}