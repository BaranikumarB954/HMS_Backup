import { Routes } from '@angular/router';
import { LAYOUT_ROUTES } from './layout/layout.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFound } from './core/errors/not-found/not-found';
import { AUTH_ROUTES } from './auth/auth.routes';

export const routes: Routes = [
  {
    path : '',
    loadComponent : ()=> import('./landing/home/home').then(m=>m.Home)
  },
  {
    path : 'join-us',
    loadComponent : ()=> import('./public/join-us/join-us').then(m=>m.JoinUs)
  },
  {
    path:  'register',
    loadComponent : ()=> import('./public/register/register').then(m=>m.Register)
  },
  {
    path: 'auth',
    children: AUTH_ROUTES
  },

  {
    path: 'app',
    canActivate: [AuthGuard],
    children: LAYOUT_ROUTES
  },
  {
    path : '**',
    component : NotFound
  }
];