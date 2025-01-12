import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para habilitar *ngIf
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-user-login',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule], // Agrega CommonModule aquí para habilitar *ngIf
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  isLoggedIn = false;

  constructor(private msalService: MsalService) {}

  login() {
    this.msalService.loginPopup().subscribe({
        next: (result: AuthenticationResult) => {
            console.log('Inicio de sesión exitoso:', result);

            // Establece la cuenta activa
            this.msalService.instance.setActiveAccount(result.account);
            this.isLoggedIn = true;

            // Adquiere el token en segundo plano después de iniciar sesión
            this.msalService.acquireTokenSilent({ scopes: [] }).subscribe({
                next: (tokenResponse) => {
                    // Almacena el token en el localStorage
                    localStorage.setItem('jwt', tokenResponse.idToken);
                    console.log('Token almacenado en localStorage:', tokenResponse.idToken);
                },
                error: (tokenError) => {
                    console.error('Error al adquirir el token silenciosamente:', tokenError);
                },
            });
        },
        error: (error) => {
            console.error('Error en el inicio de sesión:', error);
        },
    });
}


  logout() {
    this.msalService.logoutPopup().subscribe({
      next: () => {
        console.log('Cierre de sesión exitoso');
        this.isLoggedIn = false;
      },
      error: (error) => {
        console.error('Error en el cierre de sesión:', error);
      },
    });
  }
}