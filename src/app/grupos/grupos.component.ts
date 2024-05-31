
import { Component, OnInit, inject } from '@angular/core'; 
import { GruposService } from '../services/grupos.service'; 
import { CommonModule } from '@angular/common'; 
import { Grupo } from '../interfaces/grupo.interface'; 
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2'; 
import { parsearErroresAPI } from '../utils/Utilities'; 
 
@Component({ 
  selector: 'app-grupos', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './grupos.component.html', 
  styleUrl: './grupos.component.scss' 
}) 
export class GruposComponent implements OnInit { 
 
  // Inyeccion de dependecias 
  private readonly gruposService = inject(GruposService); 
  private readonly router = inject(Router); 
 
  // Arreglo para almacenar el listado de estudiantes 
  lstGrupos: Grupo[]; 
 
  constructor() { 
    // Es necesario inicializar el arreglo anteriormente creado 
    this.lstGrupos = [];   
   } 
 
  ngOnInit(): void { 
    this.getAllGrupos(); 
  } 
 
  // Obtener lista de estudiantes 
  getAllGrupos(){ 
    this.gruposService.obtenerGrupos().subscribe({ 
      // Se evalua que la respuesta del endpoint sea exitosa 
      next: (temp) => { 
        // Se asigna la lista al arreglo anteriormente descrito 
        this.lstGrupos = temp; 
      }, 
      // En caso de error 
      error: (err) => { 
        console.log("No se pudo obtener informacion"); 
    } 
}) 
} 

// Metodo que permite navegar al formulario para insertar estudiantes 
navigateToForm(){ 
this.router.navigate(['/agregarGrupo']); 
} 

// Eliminar un estudiante 
deleteGrupo(event: any){ 
Swal.fire({ 
  title: "¿Quiere eliminar este registro?", 
  text: "Esta acción no se puede revertir", 
  icon: "warning", 
  showCancelButton: true, 
  confirmButtonColor: "#3085d6", 
  cancelButtonColor: "#d33", 
  confirmButtonText: "Sí, eliminar", 
  cancelButtonText: "Cancelar", 
  showLoaderOnConfirm: true 
}).then((result) => { 
  if (result.isConfirmed){ 
    this.gruposService.eliminarGrupo(event.target.value).subscribe({ 
      // En caso exitoso 
      next: (temp) => { 
        Swal.fire("Eliminado","Registro eliminado con exito","success"); 
        // Refrescamos la lista de estudiantes 
        this.getAllGrupos(); 
      }, 
      // En caso erroneo 
      error: (err) => {  
        Swal.fire({ 
          icon: 'error', 
          title: 'Error al eliminar', 
          text: parsearErroresAPI(err).toString() 
        }); 
      } 
    }); 
  } 
}); 
} 

/** 
* Metodo que permite viajar al componente para agregar un estudiante (pero en 
modo edicion). 
  */ 
updateGrupo(valor: number){  
    // Viajando al componente agregar estudiante 
    // Primero se valida que exista un valor (es decir que sea distinto de nulo) 
    if(valor){ 
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej. 
//agregarGrupo/3 
      this.router.navigate(['/agregarGrupo', valor]); 
    } 
  } 
} 