import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AdminEmployees } from './pages/employee/employees';
import { NotFound } from '../../core/errors/not-found/not-found';
import { Profile } from '../../shared/components/profile/profile';
import { AddPatient } from '../../shared/components/addPatient/add-patient/add-patient';
import { AddAppointment } from '../../shared/components/add-appointment/add-appointment';
import { AdminDashboard } from './pages/dashboard/dashboard';
import { AdminPatient } from './pages/patient/patient';
import { AdminDepartment } from './pages/department/department';
import { AdminApprovals } from './pages/approvals/approvals';
import { AdminAppointments } from './pages/appointments/appointments';
import { AdminDoctor } from './pages/doctor/doctor';
import { HealthRecordComponent } from './pages/health-record/health-record';
import { AddHealthRecord } from '../../shared/components/add-health-record/add-health-record';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard
      },
      {
        path: 'employee',
        component: AdminEmployees
      },
      {
        path : 'doctor',
        component : AdminDoctor
      },
      {
        path : 'patient',
        component : AdminPatient
      },
      {
        path: 'departments',
        component: AdminDepartment
      },
      {
        path: 'approval',
        component: AdminApprovals
      },
      {
        path : 'appointments',
        component : AdminAppointments
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
        path : 'health-records',
        component : HealthRecordComponent
      },
      {
        path : 'add-healthRecord',
        component : AddHealthRecord
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