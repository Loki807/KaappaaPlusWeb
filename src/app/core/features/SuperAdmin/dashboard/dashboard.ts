import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tenant } from '../../../../Types/tenant.model';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  
})
export class Dashboard {



  tenants: Tenant[] = [];
  totalCount = 0;
  policeCount = 0;
  fireCount = 0;
  ambulanceCount = 0;
  currentYear: number = new Date().getFullYear();

  constructor(private tenantService: TenantService, private router: Router) {}

  ngOnInit(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.tenants = data;
         this.totalCount = data.length;  // 🟢 TOTAL tenants count
        this.policeCount = data.filter(t => t.serviceType === 'Police').length;
        this.fireCount = data.filter(t => t.serviceType === 'Fire').length;
        this.ambulanceCount = data.filter(t => t.serviceType === 'Ambulance').length;
      },
      error: (err) => console.error('Error fetching tenants', err)
    });
  }

  viewTenants(serviceType: string) {
    this.router.navigate(['/tenant-details'], { queryParams: { serviceType } });
  }

  viewAllTenants() {
  this.router.navigate(['/tenant-details']); 
}

  goToTenantCreate() {this.router.navigate(['/tenant-create'])}



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}



