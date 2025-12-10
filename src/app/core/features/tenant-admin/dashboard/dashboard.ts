import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Storage } from '../../../../Store/storage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  service = inject(UserService);
  storage = inject(Storage);
  router = inject(Router);

  tenantName: string = "Unknown Tenant";
  tenantId: string = "";
  users: any[] = [];
  loading = true;
  menuOpen = false;

  ngOnInit() {

    this.tenantId = this.storage.getTenantId() ?? "";

    if (!this.tenantId) {
      this.loading = false;
      return;
    }

    this.tenantName = this.storage.getTenantName() ?? "Unknown Tenant";

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

  viewUser(id: string) {
    this.router.navigate(['/user-view', id]);
  }

  editUser(id: string) {
    this.router.navigate(['/user-edit', id]);
  }

  deleteUser(id: string) {
    if (!confirm("⚠ Delete this user?")) return;

    this.service.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    });
  }

  toggleProfileMenu() {
    this.menuOpen = !this.menuOpen;
  }

  createUser() {
    this.router.navigate(['/users-create']);
  }

  logout() {
    this.storage.clearAll();
    this.router.navigate(['/login']);
  }
}
