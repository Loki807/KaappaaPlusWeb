
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', loadComponent: () => import('./Pages/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./core/features/login/login').then(m => m.Login) },
  { path: 'change-password', loadComponent: () => import('./core/features/change-password/change-password').then(m => m.ChangePassword) },
  { path: 'dashboard', loadComponent: () => import('./core/features/SuperAdmin/dashboard/dashboard').then(m => m.Dashboard) },
   { path: 'tenant-create', loadComponent: () => import('./core/features/SuperAdmin/tenant-create/tenant-create').then(m => m.TenantCreate) }
];
