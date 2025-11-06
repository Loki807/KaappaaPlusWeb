import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../Types/login-request.type';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Storage } from '../../../Store/storage';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


   fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);
  storage = inject(Storage);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';
  loading = false;

  submit() {
    if (this.form.invalid) return;

    const request: LoginRequest = this.form.value as LoginRequest;
    this.loading = true;
    this.message = '';

    this.auth.login(request).subscribe({
      next: (res: any) => {
        this.loading = false;

        // 1) Save the JWT for the interceptor
        this.storage.setToken(res.token);

        // 2) Persist handy fields for guards/UX
        if (res.role) this.storage.set('role', res.role);

        // store tenantId if API returns it; otherwise try to read from JWT claim
        if (res.tenantId) {
          this.storage.set('tenantId', res.tenantId);
        } else {
          const tid = this.storage.getTenantId(); // decodes JWT: tenantId/tid/tenant_id
          if (tid) this.storage.set('tenantId', tid);
        }

        // 3) Figure out "first login" (prefer boolean; fallback to message text if your API uses that)
        const isFirst =
          typeof res.isFirstLogin === 'boolean'
            ? res.isFirstLogin
            : !!res.message?.includes('Password change required');

        this.storage.set('isFirstLogin', String(isFirst)); // "true" | "false"

        // 4) Route by role + first-login rule
        if (res.role === 'TenantAdmin') {
          if (isFirst) {
            // Send to change password the FIRST time
            this.router.navigate(
              ['/change-password'],
              { queryParams: { email: request.email } }
            );
          } else {
            // Next logins go straight to Tenant Admin dashboard
            this.router.navigate(['/tenant-admin/dashboard']);
          }
        } else if (res.role === 'SuperAdmin') {
          this.router.navigate(['/dashboard']);
        } else {
          // default fallback
          this.router.navigate(['/tenant-dashboard']);
        }
      },
      error: () => {
        this.loading = false;
        this.message = '❌ Invalid email or password.';
      }
    });
  }
}
