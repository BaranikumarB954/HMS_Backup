import { Routes } from '@angular/router';
import { Owner } from './owner';
import { NotFound } from '../../core/errors/not-found/not-found';
import { Profile } from '../../shared/components/profile/profile';
import { OwnerDashboard } from './pages/owner-dashboard/owner-dashboard';
import { OwnerApprovals } from './pages/owner-approvals/owner-approvals';
import { OwnerDoctor } from './pages/ownerEmployee/owner-doctor/owner-doctor';
import { OwnerNurse } from './pages/ownerEmployee/owner-nurse/owner-nurse';
import { OwnerReceptionist } from './pages/ownerEmployee/owner-receptionist/owner-receptionist';
import { OwnerCashier } from './pages/ownerEmployee/owner-cashier/owner-cashier';
import { OwnerAdmin } from './pages/ownerEmployee/owner-admin/owner-admin';

export const OWNER_ROUTES: Routes = [
  {
     path: '',
        component: Owner,
        children: [

      {
        path: 'dashboard',
        component: OwnerDashboard
      },
      {
        path : 'employee',
        children:[
          {
            path : 'admin',
            component : OwnerAdmin
          },
          {
            path : 'doctor',
            component : OwnerDoctor
          },
          {
            path : 'nurse',
            component : OwnerNurse
          },
          {
            path : 'receptionist',
            component : OwnerReceptionist
          },
          {
            path : 'cashier',
            component : OwnerCashier
          },
          {
            path : '',
            redirectTo : 'doctor',
            pathMatch : 'full'
          }
        ]
      },
      {
        path : 'approvals',
        component : OwnerApprovals
      },
      {
        path : 'profile',
        component : Profile
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFound
      }

 
 
 
 

    ]
  }
];