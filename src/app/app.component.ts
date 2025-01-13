import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();

    if (!account) {
      // Si no hay cuenta activa, redirigir al login
      console.warn('No hay cuenta activa, redirigiendo al login.');
      this.router.navigate(['/login-user']);
    }
  }
}
