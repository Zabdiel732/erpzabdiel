export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Hecho';
  assignedTo: string;
  priority: 'Baja' | 'Media' | 'Alta';
  limitDate: Date;
}
