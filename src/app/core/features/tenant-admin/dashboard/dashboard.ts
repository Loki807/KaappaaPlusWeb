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

  tenantName = "";         // Full name
  tenantShortName = "";    // Only first word
  users: any[] = [];
  loading = true;
  menuOpen = false;

  ngOnInit() {

    // Get Tenant Name
    this.tenantName = this.storage.getTenantName() ?? "Unknown Tenant";

    // Make first word only (Short Display Name)
    this.tenantShortName = this.tenantName.split(" ")[0];  
    // Example: "kilinochi"

    this.loadUsers();
  }

  loadUsers() {
    this.service.getTenantUsers().subscribe({
      next: (res) => {
        this.users = res.filter(u => u.role !== "TenantAdmin");
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleProfileMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.storage.clearAll();
    this.router.navigate(['/login']);
  }

  createUser() {
    this.router.navigate(['/users-create']);
  }

 
  goToProfile() {
    alert("Profile Page Coming Soon");
  }

  goToSettings() {
    alert("Settings Page Coming Soon");
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

back(){
  
}
}
