import { Component } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';  // Import the Tenant model
import { TenantService } from '../../../services/tenant.service';  // Import the service that handles API calls

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.html',
  styleUrl: './tenant-details.css',
})
export class TenantDetails {
  tenants: Tenant[] = [];  // Define an array to hold tenant data
  loading: boolean = true;  // Boolean for tracking loading state
  message: string = '';     // Message to show for errors or success

  constructor(private tenantService: TenantService) {}  // Inject the tenant service

  ngOnInit(): void {
    this.loadTenants();  // Call the method to load tenant data when the component is initialized
  }

  loadTenants(): void {
    // Call the service to get all tenants from the backend
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.tenants = data;  // Store tenant data in the component
        this.loading = false; // Set loading to false after data is fetched
      },
      error: (err) => {
        this.message = '❌ Error fetching tenants. Please try again!';  // Handle any errors from the backend
        this.loading = false;  // Set loading to false after error
      }
    });
  }
}
