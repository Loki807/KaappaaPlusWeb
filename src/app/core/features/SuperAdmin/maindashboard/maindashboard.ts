import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './maindashboard.html',
  styleUrls: ['./maindashboard.css']
})
export class Maindashboard {
  totalDepartments = 0;
  totalTenants = 0;
  currentYear = new Date().getFullYear();
  router = inject(Router);                 // ⭐ MUST HAVE
  tenantService = inject(TenantService);   // ⭐ MUST HAVE

ngOnInit(): void {
  this.tenantService.getAllTenants().subscribe({
    next: (data) => {

      // ⭐ Count all tenants
      this.totalTenants = data.length;

      // ⭐ Count only departments (Police / Fire / Ambulance)
      this.totalDepartments = data.filter(t => t.serviceType != null).length;

    },
    error: (err) => {
      console.error("Failed to load tenants:", err);
    }
  });
}

  openTenants() {
    this.router.navigate(['/dashboard']); // ⭐ Works now
  }

  openUsers() {
    this.router.navigate(['/users-details']);  // ⭐ Works now
  }

logout() {
     this.router.navigate(['/login123']);
  }
  goTo() {
   this.router.navigate(['/firstpage']);
  }
  goAdmin(){
   this.router.navigate(['/AdminDetails']);}
}
