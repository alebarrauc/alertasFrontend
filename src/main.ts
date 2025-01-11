import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { PatientListComponent } from './app/component/patient-list/patient-list.component';
import { EnterPatientComponent } from './app/component/enter-patient/enter-patient.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Importar HttpClientModule para solicitudes HTTP
    provideRouter([
      { path: '', redirectTo: '/patient-list', pathMatch: 'full' }, // Redirigir la raíz a 'patient-list'
      { path: 'patient-list', component: PatientListComponent }, // Ruta para el listado de pacientes
      { path: 'enter-patient', component: EnterPatientComponent }, // Ruta para ingresar pacientes
    ]),
  ],
}).catch((err) => console.error(err));
