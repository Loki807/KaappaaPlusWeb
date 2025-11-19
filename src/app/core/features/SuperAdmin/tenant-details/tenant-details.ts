import { Component, OnInit, inject } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../../services/tenant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {

  tenants: Tenant[] = [];
  filteredTenants: Tenant[] = [];
  originalTenants: Tenant[] = [];   // ⭐ for search
  loading = true;
  message = '';
  searchText = '';
  currentYear = new Date().getFullYear();

  selectedServiceType: string | null = null;

  router = inject(Router);
  route = inject(ActivatedRoute);
  tenantService = inject(TenantService);

  // ------------------------------------------------------------------
  // 🔥 1️⃣ ON PAGE LOAD — GET DATA FROM RESOLVER + FILTER BY DASHBOARD
  // ------------------------------------------------------------------
 ngOnInit(): void {
  this.selectedServiceType = this.route.snapshot.queryParamMap.get('serviceType');

  this.tenants = this.route.snapshot.data['tenants'];

  if (this.selectedServiceType) {
    this.filteredTenants = this.tenants.filter(
      t => t.serviceType === this.selectedServiceType
    );
  } else {
    this.filteredTenants = [...this.tenants];
  }

  this.loading = false;
}

  // ------------------------------------------------------------------
  // 🔍 2️⃣ SEARCH METHOD
  // ------------------------------------------------------------------
 applySearch() {
  const text = this.searchText.toLowerCase().trim();

  if (text === '') {
    this.filteredTenants = [...this.tenants]; // reset all
    return;
  }

  this.filteredTenants = this.tenants.filter(t =>
    t.name.toLowerCase().includes(text) ||
    t.code.toLowerCase().includes(text)
  );
}

  // ------------------------------------------------------------------
  // 👁 3️⃣ VIEW BUTTON
  // ------------------------------------------------------------------
  viewTenant(id: string) {
    this.router.navigate(['/tenant/view', id]);
  }

  // ------------------------------------------------------------------
  // ✏️ 4️⃣ UPDATE BUTTON
 editTenant(id: string) {
  this.router.navigate(['/tenant/update', id], {
    queryParams: { from: 'details' }
  });
}
  // ------------------------------------------------------------------
  // 🗑 5️⃣ DELETE BUTTON
  // ------------------------------------------------------------------
  deleteTenant(id: string) {
    if (!confirm("⚠ Are you sure you want to delete this tenant?")) return;

    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        alert("Tenant deleted successfully!");

        // Remove from UI
        this.filteredTenants = this.filteredTenants.filter(t => t.id !== id);
      },
      error: err => {
        console.error(err);
        alert("❌ Delete failed!");
      }
    });
  }

  // ------------------------------------------------------------------
  // ⬅ BACK BUTTON
  // ------------------------------------------------------------------
  Back() {
    this.router.navigate(['/dashboard']);
  }
}
