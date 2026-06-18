import { Routes } from '@angular/router';
import { Receptionist } from './receptionist';
import { NotFound } from '../../core/errors/not-found/not-found';
import { Profile } from '../../shared/components/profile/profile';
import { ReceptionDashboard } from './pages/reception-dashboard/reception-dashboard';
import { ReceptionPatients } from './pages/reception-patients/reception-patients';
import { ReceptionAppointments } from './pages/reception-appointments/reception-appointments';

export const RECEPTION_ROUTES: Routes = [
  {
    path: '',
        component: Receptionist,
        children: [

 
      {
        path: 'dashboard',
        component: ReceptionDashboard
      },

 
      {
        path: 'patient',
        component: ReceptionPatients
      },
      {
        path: 'appointments',
        component: ReceptionAppointments
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