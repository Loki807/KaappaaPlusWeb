import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { Tenant } from '../../../../Types/tenant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-details',
   imports: [CommonModule,], 
  templateUrl: './tenant-details.html',
  styleUrls: ['./tenant-details.css'],
})
export class TenantDetails implements OnInit {
  tenants: Tenant[] = []; // To store tenant data
  loading: boolean = true; // Loading state
  message: string = ''; // For error or info messages

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.loadTenants(); // Fetch tenants when the component initializes
  }

  loadTenants() {
    this.tenantService.getAllTenants().subscribe({
      next: (data) => {
        this.tenants = data; // Store fetched tenants
        this.loading = false; // Stop loading
      },
      error: (err) => {
        this.message = '❌ Error fetching tenants. Please try again!';
        this.loading = false; // Stop loading
      },
    });
  }
}

