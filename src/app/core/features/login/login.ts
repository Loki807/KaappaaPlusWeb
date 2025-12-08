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
currentYear: number = new Date().getFullYear(); // ⭐ FIXED HERE
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

    const req: LoginRequest = this.form.value as LoginRequest;
    this.loading = true;

    this.auth.login(req).subscribe({
      next: (res) => {
        this.loading = false;

        // ⭐ 1. Save token
        this.storage.setToken(res.token);

        // ⭐ 2. Save user name (shown as tenant name)
        this.storage.saveTenantName(res.name);   // YOU REQUESTED THIS
      

        // ⭐ 3. Extract tenantId from token
        const tid = this.storage.getTenantId();
        if (tid) {
          this.storage.saveTenantId(tid);
        }

        // ⭐ 4. Role based navigation
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
