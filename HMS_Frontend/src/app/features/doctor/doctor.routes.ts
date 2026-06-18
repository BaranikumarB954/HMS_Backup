import { Routes } from '@angular/router';
import { Doctor } from './doctor';
import { DoctorDashboard } from './pages/doctor-dashboard/doctor-dashboard';
import { DoctorPatient } from './pages/doctor-patient/doctor-patient';
import { DoctorAppointments } from './pages/doctor-appointments/doctor-appointments';
import { Profile } from '../../shared/components/profile/profile';
import { AddPatient } from '../../shared/components/addPatient/add-patient/add-patient';
import { AddAppointment } from '../../shared/components/add-appointment/add-appointment';
import { NotFound } from '../../core/errors/not-found/not-found';

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    component: Doctor, // 🔥 layout wrapper (optional but recommended)
    children: [
      {
        path: 'dashboard',
        component: DoctorDashboard
      },
      {
        path: 'patient',
        component: DoctorPatient
      },
      {
        path : 'appointments',
        component : DoctorAppointments
      },
      {
        path : 'profile',
        component : Profile
      },
      {
        path : 'addPatient',
        component : AddPatient
      },
      {
        path : 'add-appointment',
        component : AddAppointment
      },
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },
      {
        path : "**",
        component : NotFound
      }

    ]
  }
];