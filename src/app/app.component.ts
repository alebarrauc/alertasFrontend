import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientListComponent } from './component/patient-list/patient-list.component'; // Ruta correcta a tu componente
import { UserLoginComponent } from './component/user-login/user-login.component'; // Ruta correcta a tu componente
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule], // Agregar aquí el componente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private msalService: MsalService) {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) {
      // Si no hay cuenta activa, redirigir al login o cerrar sesión
      this.msalService.logoutRedirect();
    }
  }

  
}
