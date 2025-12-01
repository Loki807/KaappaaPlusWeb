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
   fb = inject(FormBuilder);
  storage = inject(Storage);
  api = inject(UserService);
  router = inject(Router);

  message = '';
  loading = false;
  tenantId = '';

  formDirty = false;  



  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.tenantId =
      this.storage.get('tenantId') ??
      this.storage.getTenantId() ??
      '';

    if (!this.tenantId) {
      this.message = '⚠️ Missing tenant ID. Please login again.';
    }
      this.form.valueChanges.subscribe(() => {
    this.formDirty = true;     // user typed something
  });
  
  }




  
  submit() {
    this.message = '';

    if (this.form.invalid) {
      this.message = '⚠️ Please fill all fields correctly.';
      return;
    }

    if (!this.tenantId) {
      this.message = '⚠️ Missing tenant ID.';
      return;
    }

    const req: CreateUserRequest = {
      tenantId: this.tenantId,
      name: this.form.value.name!,
      email: this.form.value.email!,
      phone: this.form.value.phone!,
      password: this.form.value.password!,
      role: this.form.value.role! as AppRole,
    };

    this.loading = true;

    this.api.createUser(req).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ User created successfully';

        setTimeout(() => {
          this.router.navigate(['/tenant-dashboard']);
        }, 800);
      },

      error: (err) => {
        this.loading = false;

        const details =
          err?.error?.errors
            ? JSON.stringify(err.error.errors)
            : err?.error?.message
            ? err.error.message
            : err?.status === 403
            ? 'Forbidden: You are not allowed'
            : 'Bad Request';

        this.message = `❌ ${details}`;
      },
    });

  }
    
 
back() {
  // Trigger navigation normally → Guard will handle confirmation
  this.router.navigate(['/tenant-dashboard']);
}


canDeactivate() {
  if (this.formDirty && this.form.dirty) {
    return confirm("⚠ You have unsaved changes! Do you really want to leave?");
  }
  return true;
}


}

