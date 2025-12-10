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

  message = '';
  loading = false;
  showPassword = false;
  currentYear = new Date().getFullYear();

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Enter email and password.';
      return;
    }

    const request: LoginRequest = this.form.value as LoginRequest;
    this.loading = true;

    this.auth.login(request).subscribe({
      next: (res) => {
        this.loading = false;

        // FIRST LOGIN → CHANGE PASSWORD
        if (res.requirePasswordChange || res.message?.includes('Password change required')) {
          this.router.navigate(['/change-password'], {
            queryParams: { email: request.email },
          });
          return;
        }

        // SAVE TOKEN
        this.storage.setToken(res.token);

        // SAVE TENANT DATA
        this.storage.saveTenantName(res.tenantName);
        this.storage.saveTenantId(res.tenantId);
       

        // NAVIGATION
        if (res.role === 'TenantAdmin') {
          this.router.navigate(['/tenatadminmain']);
        } 
        else if (res.role === 'SuperAdmin') {
          this.router.navigate(['/maindashboard']);
        } 
        else {
          this.message = '❌ Access denied.';
        }
      },

      error: () => {
        this.loading = false;
        this.message = '❌ Invalid email or password.';
      }
    });
  }
}
