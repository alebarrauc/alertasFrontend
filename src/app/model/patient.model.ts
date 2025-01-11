export interface Patient {
    id: number;
    name: string;
    age: number;
    room: string;
    bed: string;
    registrationDate: string; // LocalDate en el backend se maneja como string en Angular
  }
  