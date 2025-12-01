import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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

  fb = inject(FormBuilder);
  service = inject(TenantService);
  router = inject(Router);

  message = '';
  loading = false;

  // Sri Lankan districts
  districts = [
    "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo",
    "Galle","Gampaha","Hambantota","Jaffna","Kalutara",
    "Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar",
    "Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya",
    "Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"
  ];

  form = this.fb.group({
    name: ['', Validators.required],
   email: [
  '',
  [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._]+@gmail\.com$/)
  ]
],
    addressLine1: ['', Validators.required],
    addressLine2: ['',Validators.required],
    city: ['', Validators.required],
    stateOrDistrict: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    contactNumber: ['', [
      Validators.required,
      Validators.pattern(/^(?:\+94|0)\d{9}$/),Validators.maxLength(10)
    ]],
    serviceType: ['', Validators.required],
    logoUrl: ['',Validators.required]
  });


  formDirty = false;

ngOnInit() {
  this.form.valueChanges.subscribe(() => {
    this.formDirty = true;
  });
}

canDeactivate() {
  if (this.formDirty && this.form.dirty) {
    return confirm("⚠ You have unsaved changes! Do you really want to leave?");
  }
  return true;
}
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();   // 👈 Highlight all errors
      this.message = '⚠ Please fill all required fields correctly.';
      return;
    }

    this.loading = true;
    this.message = '';

    this.service.createTenant(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.message = "Tenant created successfully!";
        setTimeout(() => this.router.navigate(['/maindashboard']), 1200);
      },
      error: err => {
        this.loading = false;
        console.error(err);
        this.message = err.error?.message || "❌ Tenant creation failed.";
      }
    });
  }

 back() {
  // User confirmed → go back
  this.router.navigate(['/dashboard']);
}

}
