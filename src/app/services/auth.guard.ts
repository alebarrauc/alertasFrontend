import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

/**
 * Este guard se encarga de restringir el acceso a rutas específicas 
 * asegurándose de que el usuario esté autenticado a través de MSAL (Microsoft Authentication Library).
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor para inicializar dependencias necesarias como el servicio de autenticación y el enrutador.
   * @param msalService Proporciona los métodos para gestionar la autenticación mediante MSAL.
   * @param router Permite redirigir al usuario en caso de no estar autenticado.
   */
  constructor(private msalService: MsalService, private router: Router) { }

  /**
   * Evalúa si el usuario tiene una sesión activa para autorizar el acceso a una ruta.
   * @returns Devuelve `true` si el usuario está autenticado, o redirige al login y devuelve `false` en caso contrario.
   */
  canActivate(): boolean {
    const account = this.msalService.instance.getActiveAccount();

    if (account) {
      // El usuario tiene una sesión activa
      return true;
    } else {
      // No se detectó sesión activa; se redirige al login
      console.warn('Sesión no encontrada, redirigiendo al inicio de sesión.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
