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
   currentYear = new Date().getFullYear();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';
  loading = false;

   submit() {
    if (this.form.invalid) {
      this.message = '⚠️ Please enter valid email and password.';
      return;
    }

    const request: LoginRequest = this.form.value as LoginRequest;
    this.loading = true;
    this.message = '';

   this.auth.login(request).subscribe({
  next: (res) => {
    this.loading = false;

    // 1️⃣ First-time login → change password
    if (res.message?.includes('Password change required')) {
      this.router.navigate(['/change-password'], {
        queryParams: { email: request.email },
      });
      return;
    }

    // 2️⃣ Save token
    this.storage.setToken(res.token);
    
    // 3️⃣ Extract tenantId from the token
    const tid = this.storage.getTenantId();

    // 4️⃣ Save tenantId so dashboard can read it
    if (tid) {
      localStorage.setItem('tenantId', tid);
    }

    // 5️⃣ Role-based navigation
    switch (res.role) {
      case 'SuperAdmin':
        this.router.navigate(['/maindashboard']);
        break;

      case 'TenantAdmin':
        this.router.navigate(['/tenant-dashboard']);
        break;

      default:
        this.message = '🚫 Access denied.';
        this.router.navigate(['/home']);
        break;
    }
  },

  error: (err) => {
    this.loading = false;
    console.error('Login error:', err);
    this.message = '❌ Invalid email or password.';

    this.form.controls['email'].setValue('');
    this.form.controls['password'].setValue('');
  }
});

   }
  }
