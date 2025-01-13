import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { PatientListComponent } from './app/component/patient-list/patient-list.component';
import { EnterPatientComponent } from './app/component/enter-patient/enter-patient.component';
import { UserLoginComponent } from './app/component/user-login/user-login.component';
import { MsalGuard, MsalService } from '@azure/msal-angular';
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AuthInterceptorInterceptor } from './app/auth-interceptor.interceptor';

// MSAL Instance Configuration
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'c3a34b3a-70aa-47f5-b432-b9c613b220f2',
    authority: 'https://login.microsoftonline.com/145f8758-681d-4413-9137-2973073f86e2',
    redirectUri: 'http://localhost:4200/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
});

// Manejar la redirección de manera segura
msalInstance.handleRedirectPromise().then((response) => {
  if (response && response.account) {
    msalInstance.setActiveAccount(response.account);
    console.log('Cuenta activa configurada:', response.account);
  }
}).catch((error) => {
  console.error('Error al manejar la redirección:', error);
});

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      MsalModule.forRoot(
        msalInstance,
        {
          interactionType: InteractionType.Popup,
          authRequest: { scopes: ['user.read'] },
        },
        {
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map([
            ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ]),
        }
      )
    ),
    provideRouter([
      { path: '', redirectTo: '/patient-list', pathMatch: 'full' },
      { path: 'patient-list', component: PatientListComponent },
      { path: 'enter-patient', component: EnterPatientComponent, canActivate: [MsalGuard] },
      { path: 'login-user', component: UserLoginComponent },
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
