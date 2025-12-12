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

    // 1️⃣ Read district from URL
    this.selectedDistrict = this.route.snapshot.queryParamMap.get('district');

    // 2️⃣ Get all tenants
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {

        // 3️⃣ Apply district filter
        if (this.selectedDistrict) {
          data = data.filter(t =>
            t.stateOrDistrict?.toLowerCase() === this.selectedDistrict!.toLowerCase()
          );
        }

        this.tenants = data;

        // 4️⃣ Count service types
        this.policeCount = data.filter(t => t.serviceType === 'Police').length;
        this.fireCount = data.filter(t => t.serviceType === 'Fire').length;
        this.ambulanceCount = data.filter(t => t.serviceType === 'Ambulance').length;
      }
    });
  }

  // When clicking Police / Fire / Ambulance
  viewTenants(serviceType: string) {
    this.router.navigate(['/tenant-details'], {
      queryParams: { 
        serviceType,
        district: this.selectedDistrict
      }
    });
  }



  logout() {
    this.router.navigate(['/firstpage']);
  }

}



