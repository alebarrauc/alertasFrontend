import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service'; // Importa el servicio
import { Patient } from '../../model/patient.model'; // Importa el modelo
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-enter-patient',
  templateUrl: './enter-patient.component.html',
  styleUrls: ['./enter-patient.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class EnterPatientComponent {
  patient: Patient = {
    name: '',
    age: null,
    room: '',
    bed: '',
    registrationDate: '',
  };

  constructor(
    private patientService: PatientService, // Inyecta el servicio PatientService
    private router: Router // Inyecta el servicio Router
  ) {}

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
}
