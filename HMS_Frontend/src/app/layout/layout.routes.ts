import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
    {
        path: 'owner',
        loadChildren: () =>
          import('../features/owner/owner.routes')
            .then(m => m.OWNER_ROUTES)
      },
 
      {
        path: 'admin',
        loadChildren: () =>
          import('../features/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES)
      },

 
      {
        path: 'doctor',
        loadChildren: () =>
          import('../features/doctor/doctor.routes')
            .then(m => m.DOCTOR_ROUTES)
      },

 
      {
        path: 'reception',
        loadChildren: () =>
          import('../features/receptionist/receptionist.routes')
            .then(m => m.RECEPTION_ROUTES)
      }

    ]
  }
];