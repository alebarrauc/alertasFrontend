import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    // Configura el estado inicial
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (activeAccount) {
      console.log('Cuenta activa detectada:', activeAccount);
      this.isLoggedIn = true;
    } else {
      console.log('No hay cuenta activa.');
    }
  }

  login() {
    this.msalService.loginPopup().subscribe({
      next: (result: AuthenticationResult) => {
        console.log('Inicio de sesión exitoso:', result);
        this.msalService.instance.setActiveAccount(result.account);
        this.isLoggedIn = true;
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
