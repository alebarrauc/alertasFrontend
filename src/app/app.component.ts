import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './component/patient-list/patient-list.component'; // Ruta correcta a tu componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PatientListComponent], // Agregar aquí el componente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
