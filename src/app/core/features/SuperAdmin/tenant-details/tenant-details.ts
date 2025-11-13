import { Component, inject, OnInit } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { Tenant } from '../../../../Types/tenant.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tenant-details',
   imports: [CommonModule,], 
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {
 tenants: Tenant[] = [];
  filteredTenants: Tenant[] = [];
  selectedServiceType: string | null = null;
  loading = true;
   router = inject(Router);
  
  message: string = '';
 

  constructor(private tenantService: TenantService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Read query param
    this.selectedServiceType = this.route.snapshot.queryParamMap.get('serviceType');
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.tenants = data;
        if (this.selectedServiceType) {
          this.filteredTenants = data.filter(t => t.serviceType === this.selectedServiceType);
        } else {
          this.filteredTenants = data;
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

   Back() {
    this.router.navigate(['/dashboard']);///this coding for the back button///
   
     
  }
}

