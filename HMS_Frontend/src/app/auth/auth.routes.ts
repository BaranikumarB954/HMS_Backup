import { Routes } from '@angular/router';

import { Login } from './login/login';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent : ()=> import('./login/login').then(m=>m.Login)
  },
  {
    path : 'forgot-password',
    loadComponent : ()=> import('./forgot-password/forgot-password').then(m=>m.ForgotPassword)
  },
  {
    path: 'reset-password/:token',
    loadComponent : ()=> import('./reset-password/reset-password').then(m=>m.ResetPassword)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];