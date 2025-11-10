import { Component } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { TenantService } from '../../../services/tenant.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-tenant-details',
  imports: [],
  templateUrl: './tenant-details.html',
  styleUrl: './tenant-details.css',
})
export class TenantDetails {
tenants: Tenant[] = [];  // Holds the list of tenants
  loading: boolean = true;  // For loading state
  message: string = '';     // To display messages

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.tenants = data;  // Store the tenant data
        this.loading = false; // Hide the loading indicator
      },
      error: (err) => {
        this.message = '❌ Error fetching tenants. Please try again!';
        this.loading = false;
      }
    });
  }
}
