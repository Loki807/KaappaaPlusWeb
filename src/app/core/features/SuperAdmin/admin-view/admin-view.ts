import { Component, inject, OnInit } from '@angular/core';
import { Tenant } from '../../../../Types/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../services/tenant.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css',
})
export class AdminView implements OnInit {
 departments: Tenant[] = [];
  loading = true;
  error = '';

  tenantService = inject(TenantService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.tenantService.getAllTenants().subscribe({
      next: (res) => {
        // 🔥 FILTER ONLY DEPARTMENTS
        this.departments = res.filter(t => t.serviceType != null);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to load departments.";
        this.loading = false;
      }
    });
  }

  // 👉 VIEW DEPARTMENT (redirect to tenant view)
  viewDept(id: string) {
    this.router.navigate(['/tenant/view', id]);
  }

  // 👉 EDIT DEPARTMENT
  editDept(id: string) {
    this.router.navigate(['/tenant/update', id]);
  }

  // 👉 DELETE DEPARTMENT
  deleteDept(id: string) {
    if (!confirm("⚠ Are you sure you want to delete this department?"))
      return;

    this.tenantService.deleteTenant(id).subscribe({
      next: () => {
        alert("Department deleted successfully!");
        this.departments = this.departments.filter(d => d.id !== id);
      },
      error: (err) => {
        console.error(err);
        alert("❌ Delete failed!");
      }
    });
  }}