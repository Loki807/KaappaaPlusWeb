
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: 'home', loadComponent: () => import('./Pages/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./core/features/login/login').then(m => m.Login) },
  { path: 'change-password', loadComponent: () => import('./core/features/change-password/change-password').then(m => m.ChangePassword) },
  { path: 'dashboard', loadComponent: () => import('./core/features/SuperAdmin/dashboard/dashboard').then(m => m.Dashboard) },
  
  
   { path: 'tenant-create', loadComponent: () => import('./core/features/SuperAdmin/tenant-create/tenant-create').then(m => m.TenantCreate) },
   { path: 'tenant-details', loadComponent: () => import('./core/features/SuperAdmin/tenant-details/tenant-details').then(m => m.TenantDetails) },
   { path: 'tenant-list', loadComponent: () => import('./core/features/SuperAdmin/tenant-list/tenant-list').then(m => m.TenantList) },
   

      { path: 'tenant-dashboard', loadComponent: () => import('./core/features/tenant-admin/dashboard/dashboard').then(m => m.Dashboard) },
         { path: 'users-create', loadComponent: () => import('./core/features/tenant-admin/users-create/users-create').then(m => m.UsersCreate) }
];
