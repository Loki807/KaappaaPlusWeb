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
private fb = inject(FormBuilder);
  private api = inject(UserService);
  private router = inject(Router);
  private storage = inject(Storage);

  loading = false;
  message = '';

  // 👇 Robust: try stored key first, then try decode from JWT (Storage.getTenantId)
  private tenantId: string =
    this.storage.get('tenantId') ?? this.storage.getTenantId() ?? '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    // keep the control as string, but cast to AppRole at submit time
    role: ['', Validators.required] as unknown as AppRole | ''
  });

  submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Fill all required fields.';
      return;
    }
    if (!this.tenantId) {
      this.message = '⚠️ Missing tenant id.';
      return;
    }

    this.loading = true;

    const req: CreateUserRequest = {
      tenantId: this.tenantId,
      name: this.form.value.name!,
      email: this.form.value.email!,
      phone: this.form.value.phone!,
      role: this.form.value.role as AppRole      // 👈 typed role
    };

    this.api.createUser(req).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ User created!';
        setTimeout(() => this.router.navigate(['tenant-dashboard']), 700);
      },
      error: (err) => {
        this.loading = false;
        this.message = `❌ ${err?.error?.message || err?.message || 'Something went wrong'}`;
      }
    });
  }
}
