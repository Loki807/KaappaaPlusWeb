import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  
})
export class Dashboard {
   service = inject(UserService);
  storage = inject(Storage);
  router = inject(Router);

  tenantName = 'Unknown Tenant';
  tenantId = '';
  users: any[] = [];
  loading = true;
serviceType = '';
themeClass = '';

  // ------------------------------
  // 1️⃣ LOAD DASHBOARD
  // ------------------------------
  ngOnInit() {
    this.tenantId = localStorage.getItem('tenantId') ?? '';

    if (!this.tenantId) {
      this.tenantName = 'Unknown Tenant';
      this.loading = false;
      return;
    }

    this.tenantName = localStorage.getItem('tenantName') ?? 'Unknown Tenant';

    this.loadUsers();
  }
  

  // ------------------------------
  // 2️⃣ LOAD USERS OF THIS TENANT
  // ------------------------------
    loadUsers() {
    this.service.getTenantUsers().subscribe({
      next: (res) => {
        this.users = res.filter(u => u.role !== "TenantAdmin");
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // ------------------------------
  // 3️⃣ VIEW USER
  // ------------------------------
  viewUser(id: string) {
    this.router.navigate(['/user-view', id]);
  }

  // ------------------------------
  // 4️⃣ EDIT USER
  // ------------------------------
  editUser(id: string) {
    this.router.navigate(['/user-edit', id]);
  }

  // ------------------------------
  deleteUser(id: string) {
  if (!confirm("⚠ Are you sure you want to delete this user?")) return;

  this.service.deleteUser(id).subscribe({
    next: () => {
      alert("User deleted successfully!");
      this.users = this.users.filter(u => u.id !== id); // update table
    },
    error: err => {
      console.error(err);
      alert("❌ Delete failed!");
    }
  });

}

menuOpen = false;

toggleProfileMenu() {
  this.menuOpen = !this.menuOpen;
}

goToProfile() {
  this.router.navigate(['/profile']);
}

goToSettings() {
  this.router.navigate(['/settings']);
}


createUser() {
    this.router.navigate(['/users-create']);
}
Back() {
    this.router.navigate(['/users-create']);
}
logout() {
    this.router.navigate(['/login']);
}
}
