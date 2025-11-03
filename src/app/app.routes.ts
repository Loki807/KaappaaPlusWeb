import { Routes } from '@angular/router';
import { Login } from './core/features/login/login';
import { ChangePassword } from './core/features/change-password/change-password';
import { Dashboard } from './Pages/dashboard/dashboard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'change-password', component: ChangePassword },
  { path: 'dashboard', component: Dashboard },
];
