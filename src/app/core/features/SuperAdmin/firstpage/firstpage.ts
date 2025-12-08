import { Component, inject } from '@angular/core';
import { TenantService } from '../../../services/tenant.service';
import { Router } from '@angular/router';
import { Tenant } from '../../../../Types/tenant.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-firstpage',
  imports: [CommonModule,FormsModule],
  templateUrl: './firstpage.html',
  styleUrl: './firstpage.css',
})
export class Firstpage {
 
  router = inject(Router);

  currentYear = new Date().getFullYear();

  searchText: string = "";
  noResults: boolean = false;

  districts: string[] = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  filteredDistricts = [...this.districts];

  // 🔍 Search filter
  filterDistricts() {
    const txt = this.searchText.toLowerCase().trim();
    this.filteredDistricts = this.districts.filter(d =>
      d.toLowerCase().includes(txt)
    );

      // If nothing found — show empty state
  this.noResults = this.filteredDistricts.length === 0;
  }

  // 👉 Navigate to Dashboard with district filter
  viewDistrict(district: string) {
    this.router.navigate(['/dashboard'], {
      queryParams: { district }
    });
  }

  goToTenantCreate() {
    this.router.navigate(['/tenant-create']);
  }

  logout(){
    this.router.navigate(['/login']);
  }
}