
import { Routes } from '@angular/router';
import {  tenantResolver } from './core/services/tenant-resolver-resolver';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', loadComponent: () => import('./Pages/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./core/features/login/login').then(m => m.Login) },
  { path: 'change-password', loadComponent: () => import('./core/features/change-password/change-password').then(m => m.ChangePassword) },
  { path: 'dashboard', loadComponent: () => import('./core/features/SuperAdmin/dashboard/dashboard').then(m => m.Dashboard) },
   { path: 'maindashboard', loadComponent: () => import('./core/features/SuperAdmin/maindashboard/maindashboard').then(m => m.Maindashboard) },
   { path: 'tenant-create', loadComponent: () => import('./core/features/SuperAdmin/tenant-create/tenant-create').then(m => m.TenantCreate) },
   { 
  path: 'tenant-details',
  loadComponent: () => import('./core/features/SuperAdmin/tenant-details/tenant-details').then(m => m.TenantDetails)},
  // resolve: { tenants: tenantResolver } },

  {
  path: 'tenant/view/:id',
  loadComponent: () =>
    import('./core/features/SuperAdmin/tenant-view/tenant-view')
      .then(m => m.TenantView)
},
{
  path: 'tenant/update/:id',
  loadComponent: () =>
    import('./core/features/SuperAdmin/tenant-update/tenant-update')
      .then(m => m.TenantUpdate)
},


{ path: 'tenant-dashboard', loadComponent: () => import('./core/features/tenant-admin/dashboard/dashboard').then(m => m.Dashboard) },
{ path: 'users-create', loadComponent: () => import('./core/features/tenant-admin/users-create/users-create').then(m => m.UsersCreate) }
];
