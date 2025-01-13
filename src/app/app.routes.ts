import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./component/user-login/user-login.component').then(c => c.UserLoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./component/user-login/user-login.component').then(c => c.UserLoginComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'enter-patient',
        loadComponent: () => import('./component/enter-patient/enter-patient.component').then(c => c.EnterPatientComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'patient-list',
        loadComponent: () => import('./component/patient-list/patient-list.component').then(c => c.PatientListComponent),
        canActivate: [AuthGuard]
    }

];
