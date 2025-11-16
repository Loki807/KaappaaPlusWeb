import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate {

  // Injecting Angular services (no constructor needed)
  fb = inject(FormBuilder);
  tenantService = inject(TenantService);
  router = inject(Router);

  loading = false;
  message = '';

  // -------------------------
  //  FORM GROUP (IMPORTANT)
  // -------------------------
  form = this.fb.group({
    name: ['', Validators.required],
    
    email: ['', [Validators.required, Validators.email]],   // REQUIRED by backend
    
    addressLine1: [''],
    addressLine2: [''],
    city: [''],
    stateOrDistrict: [''],
    postalCode: [''],
    contactNumber: [''],
    logoUrl: [''],

    serviceType: ['', Validators.required]    // REQUIRED by backend
  });

  // -------------------------
  //  SUBMIT METHOD
  // -------------------------
  submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    // Create correct payload matching backend DTO
    const payload = {
      name: this.form.value.name!,
     
      email: this.form.value.email!,
      addressLine1: this.form.value.addressLine1!,
      addressLine2: this.form.value.addressLine2!,
      city: this.form.value.city!,
      stateOrDistrict: this.form.value.stateOrDistrict!,
      postalCode: this.form.value.postalCode!,
      contactNumber: this.form.value.contactNumber!,
      logoUrl: this.form.value.logoUrl!,
      serviceType: this.form.value.serviceType!   // 🔴 must match C# DTO
    };

    // API CALL
    this.tenantService.createTenant(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Tenant created successfully!');
        this.router.navigate(['/tenant-details']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);

        this.message = err.error?.message
          ? '❌ ' + err.error.message
          : '❌ Tenant creation failed (Bad Request 400)';
      }
    });
  }

  // -------------------------
  //  BACK BUTTON
  // -------------------------
  back() {
    this.router.navigate(['/dashboard']);
  }
}
