import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private api = inject(UserService);
  private router = inject(Router);
  private storage = inject(Storage);

  userId = '';
  loading = true;
  message = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    isActive: [true]
  });

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];

    this.api.getUserById(this.userId).subscribe({
      next: res => {
        this.form.patchValue(res);
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.message = 'Please fill all fields.';
      return;
    }

   const req = {
  tenantId: this.storage.getTenantId(),   // ⭐ ADD THIS
  ...this.form.value                      // ⭐ MERGE FORM VALUES
};

this.api.updateUser(this.userId, req).subscribe({
  next: () => {
    this.message = 'Updated successfully!';
    setTimeout(() => this.router.navigate(['/tenant-dashboard']), 800);
  },
  error: () => this.message = 'Update failed.'
});

}

back() {
    this.router.navigate(['/tenant-dashboard']);
  }
}
