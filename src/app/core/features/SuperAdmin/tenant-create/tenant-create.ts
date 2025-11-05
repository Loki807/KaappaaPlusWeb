import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {TenantService }from '../../../services/tenant.service';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTenantRequest } from '../../../../Types/CreateTenantRequest';

@Component({
  selector: 'app-tenant-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate {
private fb = inject(FormBuilder);
private tenantService = inject(TenantService);
private router = inject(Router);
  
  form = this.fb.group({
    name: ['', Validators.required],
    addressLine1: [''],
    addressLine2: [''],
    city: ['', Validators.required],
    stateOrDistrict: [''],
    postalCode: [''],
    contactNumber: ['', Validators.required]
  });

  message = '';
  loading = false;



  submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Please fill all required fields.';
      return;
    }

    const token = localStorage.getItem('kaappaan_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.loading = true;
    const data = this.form.value as CreateTenantRequest;

 this.tenantService.createTenant(data).subscribe({
next: () => {
this.loading = false;
this.message = '✅ Tenant created successfully!';
setTimeout(() => this.router.navigate(['/dashboard']), 1200);
},
error: (err) => {
this.loading = false;
this.message = `❌ Error: ${err?.error?.message || err?.message || 'Something went wrong'}`;
}
});
  }
}
