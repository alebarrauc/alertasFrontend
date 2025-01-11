export interface Patient {
  id?: number; // Marca el campo como opcional
  name: string;
  age: number | null;
  room: string;
  bed: string;
  registrationDate: string;
}