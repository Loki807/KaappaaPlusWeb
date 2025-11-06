import { Component, inject } from '@angular/core';
import { AppRole, CreateUserRequest } from '../../../../Types/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from '../../../../Store/storage';

@Component({
  selector: 'app-users-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './users-create.html',
  styleUrl: './users-create.css',
})
export class UsersCreate {
 // DI with `inject` (no constructor needed)
  private fb = inject(FormBuilder);
  private api = inject(UserService);
  private router = inject(Router);
  private storage = inject(Storage);

  message = '';                                      // UI message line
  loading = false;                                   // button spinner flag

  // try stored tenantId first, else decode from JWT claim (tenantId/tid/tenant_id)
  private tenantId: string =
    this.storage.get('tenantId') ?? this.storage.getTenantId() ?? '';

  // Build the reactive form
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required] as unknown as AppRole | '',
    password: ['']  // optional
  });

  submit() {
    this.message = '';
    if (this.form.invalid) { this.message = '⚠️ Fill all required fields.'; return; }
    if (!this.tenantId)    { this.message = '⚠️ Missing tenant id.'; return; }

    // Build the request body
    const req: CreateUserRequest = {
      tenantId: this.tenantId,
      name: this.form.value.name!.trim(),
      email: this.form.value.email!.trim(),
      phone: this.form.value.phone!.trim(),
      role: this.form.value.role as AppRole,
      password: (this.form.value.password || '').toString().trim() || undefined
    };

    this.loading = true;

    this.api.createUser(req).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ User created!';

        // Route back based on *current* logged-in role
        const who = this.storage.get('role');
        setTimeout(() => {
          if (who === 'SuperAdmin') this.router.navigate(['/dashboard']);
          else this.router.navigate(['/tenant-dashboard']);
        }, 800);
      },
      error: (err) => {
        this.loading = false;
        const details =
          err?.error?.errors ? JSON.stringify(err.error.errors) :
          err?.error?.title   ? err.error.title :
          err?.error?.message ? err.error.message :
          'Bad Request';
        this.message = `❌ ${err.status ?? ''} ${details}`;
      }
    });
  }
}
