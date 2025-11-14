import { Component, OnInit, inject } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {

  tenants: Tenant[] = [];            // Full data from resolver
  filteredTenants: Tenant[] = [];    // Filtered by serviceType
  loading = true;
  message = '';
  selectedServiceType: string | null = null;

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    // 1️⃣ read serviceType from query params
    this.selectedServiceType = this.route.snapshot.queryParamMap.get('serviceType');

    // 2️⃣ read tenants from resolver
    this.tenants = this.route.snapshot.data['tenants'];

    // 3️⃣ now filter
    if (this.selectedServiceType) {
      this.filteredTenants = this.tenants.filter(
        t => t.serviceType === this.selectedServiceType
      );
    } else {
      this.filteredTenants = this.tenants;
    }

    this.loading = false;
  }
  

  Back() {
    this.router.navigate(['/dashboard']);
  }
}
