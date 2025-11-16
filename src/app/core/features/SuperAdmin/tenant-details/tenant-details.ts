import { Component, OnInit, inject } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../../services/tenant.service';

@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {

  tenants: Tenant[] = [];
  filteredTenants: Tenant[] = [];
  loading = true;
  message = '';
  selectedServiceType: string | null = null;

  router = inject(Router);
  route = inject(ActivatedRoute);
  tenantService = inject(TenantService);

  ngOnInit(): void {

    this.selectedServiceType = this.route.snapshot.queryParamMap.get('serviceType');

    this.tenants = this.route.snapshot.data['tenants'];

    if (this.selectedServiceType) {
      this.filteredTenants = this.tenants.filter(
        t => t.serviceType === this.selectedServiceType
      );
    } else {
      this.filteredTenants = this.tenants;
    }

    this.loading = false;
  }
  viewTenant(id: string) {
  this.router.navigate(['/tenant/view', id]);
}


  deleteTenant(id: string) {
  if (!confirm("⚠ Are you sure you want to delete this tenant?")) return;

  this.tenantService.deleteTenant(id).subscribe({
    next: () => {
      alert("Tenant deleted successfully!");

      // 🔥 Remove from UI
      this.filteredTenants = this.filteredTenants.filter(t => t.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("❌ Delete failed!");
    }
  });
}


  Back() {
    this.router.navigate(['/dashboard']);
  }
}

