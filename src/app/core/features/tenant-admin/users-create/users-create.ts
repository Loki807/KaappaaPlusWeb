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
  private storage = inject(Storage);
  private api = inject(UserService);
  private router = inject(Router);

  message = '';
  loading = false;
  tenantId = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required] as unknown as AppRole | '',
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    this.tenantId = this.storage.get('tenantId') ?? this.storage.getTenantId() ?? '';
    if (!this.tenantId) this.message = '⚠️ Missing tenant id (please login again).';
  }

  submit() {
    this.message = '';
    if (this.form.invalid) { this.message = '⚠️ Fill all required fields.'; return; }
    if (!this.tenantId)    { this.message = '⚠️ Missing tenant id.'; return; }

    const req: CreateUserRequest = {
      tenantId: this.tenantId,
      name: this.form.value.name!.trim(),
      email: this.form.value.email!.trim(),
      phone: this.form.value.phone!.trim(),
      password: this.form.value.password!,           // send it; backend will hash
      role: this.form.value.role as AppRole
    };

    this.loading = true;
    this.api.createUser(req).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ User created!';
        setTimeout(() => this.router.navigate(['/tenant-dashboard']), 800);
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

