import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { PatientListComponent } from './app/component/patient-list/patient-list.component';
import { EnterPatientComponent } from './app/component/enter-patient/enter-patient.component';
import { UserLoginComponent } from './app/component/user-login/user-login.component';
import { MsalGuard } from '@azure/msal-angular';

// MSAL Imports
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

// MSAL Instance Configuration
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'c3a34b3a-70aa-47f5-b432-b9c613b220f2', // Reemplaza con tu Client ID de Azure AD
    authority: 'https://login.microsoftonline.com/145f8758-681d-4413-9137-2973073f86e2', // Reemplaza con tu Tenant ID
    redirectUri: 'http://localhost:4200/', // URI donde redirigir tras el login
  },
  cache: {
    cacheLocation: 'localStorage', // Guarda la sesión en localStorage (también puedes usar sessionStorage)
    storeAuthStateInCookie: false, // Útil para navegadores más antiguos
  },
});

// Proveedores para rutas con protección
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      MsalModule.forRoot(
        msalInstance,
        {
          interactionType: InteractionType.Popup, // Usa popup para iniciar sesión
          authRequest: { scopes: ['user.read'] }, // Scopes requeridos
        },
        {
          interactionType: InteractionType.Redirect, // Usa redirect para APIs protegidas
          protectedResourceMap: new Map([
            ['https://graph.microsoft.com/v1.0/me', ['user.read']], // Recursos protegidos y sus scopes
          ]),
        }
      )
    ),
    provideRouter([
      { path: '', redirectTo: '/patient-list', pathMatch: 'full' },
      { path: 'patient-list', component: PatientListComponent}, // Protegida
      { path: 'enter-patient', component: EnterPatientComponent, canActivate: [MsalGuard] }, // Protegida
      { path: 'login-user', component: UserLoginComponent }, // Ruta pública (sin protección)
    ]),
  ],
}).catch((err) => console.error(err));
