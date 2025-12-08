import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  policeCount = 0;
  fireCount = 0;
  ambulanceCount = 0;

  selectedDistrict: string | null = null;
   currentYear = new Date().getFullYear();
  constructor(
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // ⭐ READ DISTRICT FROM QUERY
    this.selectedDistrict = this.route.snapshot.queryParamMap.get('district');

    this.tenantService.getAllTenants().subscribe({
      next: (data) => {

        // If district filter exists → filter first
        if (this.selectedDistrict) {
          data = data.filter(t =>
            t.stateOrDistrict?.toLowerCase() === this.selectedDistrict!.toLowerCase()
          );
        }

        this.tenants = data;

        // Count service types (AFTER district applied)
        this.policeCount = data.filter(t => t.serviceType === 'Police').length;
        this.fireCount = data.filter(t => t.serviceType === 'Fire').length;
        this.ambulanceCount = data.filter(t => t.serviceType === 'Ambulance').length;
      },
      error: (err) => console.error('Error fetching tenants', err)
    });
  }

  // CLICK POLICE / FIRE / AMBULANCE
  viewTenants(serviceType: string) {
    this.router.navigate(['/tenant-details'], {
      queryParams: { 
        serviceType: serviceType,
        district: this.selectedDistrict || null
      }
    });
  }

  viewAllTenants() {
    this.router.navigate(['/tenant-details']); 
  }

  goToTenantCreate() {
    this.router.navigate(['/tenant-create']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}



