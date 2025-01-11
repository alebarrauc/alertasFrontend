import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service'; // Importa el servicio
import { Patient } from '../../model/patient.model'; // Importa el modelo

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

  constructor(private patientService: PatientService) {} // Inyecta el servicio

  savePatient(): void {
    console.log('Saving patient:', this.patient);

    // Llama al método addPatient del servicio
    this.patientService.addPatient(this.patient).subscribe(
      (response) => {
        console.log('Paciente guardado exitosamente:', response);
      },
      (error) => {
        console.error('Error al guardar el paciente:', error);
      }
    );
  }
}
