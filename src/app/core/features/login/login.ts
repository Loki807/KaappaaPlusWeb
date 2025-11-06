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

    this.auth.login(request).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.message?.includes('Password change required')) {
          this.router.navigate(['/change-password'], { queryParams: { email: request.email } });
        } else {
          this.storage.setToken(res.token);
          if (res.role === 'SuperAdmin') this.router.navigate(['/dashboard']);
          else this.router.navigate(['/tenant-dashboard']);
        }
      },
      error: () => {
        this.loading = false;
        this.message = '❌ Invalid email or password.';
      }
    });
  }
}
