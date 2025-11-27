import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './maindashboard.html',
  styleUrls: ['./maindashboard.css']
})
export class Maindashboard {

  totalTenants = 0;
  currentYear = new Date().getFullYear();
  router = inject(Router);                 // ⭐ MUST HAVE
  tenantService = inject(TenantService);   // ⭐ MUST HAVE

  ngOnInit(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.totalTenants = data.length;
      },
      error: (err) => console.error(err)
    });
  }

  openTenants() {
    this.router.navigate(['/dashboard']); // ⭐ Works now
  }

  openUsers() {
    this.router.navigate(['/users-details']);  // ⭐ Works now
  }

  logout() {
   this.router.navigate(['/login']);
  }
  goTo() {
   this.router.navigate(['/dashboard']);
  }
}
