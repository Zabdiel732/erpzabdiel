import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Ticket } from '../../core/models/ticket.model';

// PrimeNG y CDK
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule, TableModule, TagModule, DragDropModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  projectName: string = 'erpzabdiel';
  version: string = 'v1.21';

  // Datos de prueba basados en los requerimientos [cite: 15, 16]
  tickets: Ticket[] = [
    { id: '1', title: 'Configurar CORS', description: 'Ajustar backend Spring Boot', status: 'En progreso', assignedTo: 'Zabdiel', priority: 'Alta', limitDate: new Date() },
    { id: '2', title: 'Diseño Kanban', description: 'Implementar tablero visual', status: 'Pendiente', assignedTo: 'Zabdiel', priority: 'Media', limitDate: new Date() }
  ];

  // Columnas para Kanban [cite: 24, 25]
  todo = this.tickets.filter(t => t.status === 'Pendiente');
  progress = this.tickets.filter(t => t.status === 'En progreso');
  done = this.tickets.filter(t => t.status === 'Hecho');

  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Aquí se actualizaría el estado del ticket en el servidor [cite: 34]
    }
  }

  // Cambia el método getSeverity por este:
  getSeverity(priority: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (priority) {
      case 'Alta':
        return 'danger';
      case 'Media':
        return 'warn'; // PrimeNG usa 'warn' en lugar de 'warning'
      case 'Baja':
        return 'info';
      default:
        return 'success';
    }
  }
}
