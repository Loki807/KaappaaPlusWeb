import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate {
fb = new FormBuilder();
  
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

  constructor(private http: HttpClient, private router: Router) {}

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

    this.http.post('https://localhost:7055/api/admin/tenant/create', this.form.value, { headers })
      .subscribe({
        next: () => {
          this.message = '✅ Tenant created successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        },
        error: (err) => {
          this.message = `❌ Error: ${err.error?.message || 'Something went wrong'}`;
          this.loading = false;
        }
      });
  }
}
