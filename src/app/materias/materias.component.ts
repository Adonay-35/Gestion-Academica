import { Component, inject } from '@angular/core'; 
import { MateriasService } from '../services/materias.service';
import { CommonModule } from '@angular/common'; 
import { Materia } from '../interfaces/materia.interface';


 
@Component({ 
  selector: 'app-materias', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './materias.component.html', 
  styleUrl: './materias.component.scss' 
}) 
export class MateriasComponent { 
 
  // Haciendo inyeccion de dependencia 
  private readonly materiasService = inject(MateriasService); 
  public lstMateria: Materia[]; 
 
  constructor(){ 
    this.lstMateria = []; 
    this.getAllSSubjects(); 
  } 
 
  getAllSSubjects(){ 
    this.materiasService.obtenerMaterias().subscribe({ 
      // Se evalua que la respuesta del endpoint sea exitosa 
      next: (temp) => { 
        // Se asigna la lista al arreglo anteriormente descrito 
        this.lstMateria = temp; 
      }, 
      // En caso de error 
      error: (err) => { 
        console.log("No se pudo obtener informacion"); 
      } 
    }) 
  } 
} 


