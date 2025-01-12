import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service'; // Importa el servicio PatientService
import { Patient } from '../../model/patient.model'; // Importa el modelo Patient
import { Router } from '@angular/router'; // Importa Router
import { DefaultBackendService } from '../../default-backend.service'; // Importa tu backend service
import { MsalService } from '@azure/msal-angular'; // Importa el servicio MSAL si usas autenticación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enter-patient',
  templateUrl: './enter-patient.component.html',
  styleUrls: ['./enter-patient.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class EnterPatientComponent {
  patient: Patient = {
    name: '',
    age: null,
    room: '',
    bed: '',
    registrationDate: '',
  };

  responseBackend: object = {}; // Inicialización de la propiedad para evitar errores

  constructor(
    private patientService: PatientService, // Inyecta el servicio PatientService
    private router: Router, // Inyecta el servicio Router
    private backendService: DefaultBackendService, // Inyecta el servicio DefaultBackendService
    private authService: MsalService // Inyecta el servicio MSAL
  ) {}

  ngOnInit(): void {
    // Llama al backend al inicializar (si es necesario)
    this.llamarBackend();
  }

  savePatient(): void {
    console.log('Saving patient:', this.patient);

    // Llama al método addPatient del servicio
    this.patientService.addPatient(this.patient).subscribe(
      (response) => {
        console.log('Paciente guardado exitosamente:', response);

        // Redirigir a la página de listar pacientes
        this.router.navigate(['/patient-list']); // Cambia la ruta según tu configuración
      },
      (error) => {
        console.error('Error al guardar el paciente:', error);
      }
    );
  }

  obtenerUsuario(): string {
    // Función para obtener el usuario autenticado
    const activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount || !activeAccount.name) {
      return 'error'; // Devuelve un mensaje de error si no hay cuenta activa o no tiene nombre
    }
    return activeAccount.name; // Devuelve el nombre si existe una cuenta activa
  }

  llamarBackend(): void {
    // Función para consumir datos del backend
    this.backendService.consumirBackend().subscribe((response) => {
      this.responseBackend = response;
      console.log('Respuesta del backend:', response);
    });
  }

  mostrarResponseBackend(): string {
    // Devuelve la respuesta del backend como string
    return JSON.stringify(this.responseBackend);
  }
}
