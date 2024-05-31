import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Materia } from '../interfaces/materia.interface';
@Injectable({
providedIn: 'root'
})
export class MateriasService {
    private readonly http = inject(HttpClient); 
 
    constructor() { } 
    
    // Obtener lista de estudiantes 
    obtenerMaterias() { 
      return this.http.get<Materia[]>(endpoints.obtenerMaterias); 
    } 
    // Obtener estudiante por ID 
    obtenerMateriaPorID(id: number){ 
      return this.http.get<Materia>(endpoints.obtenerMateriaPorID.replace(':id', id.toString())); 
    } 
    // Insertar estudiante 
    agregarMateria(materia: Materia){ 
      // Se arma el objeto a enviar 
      let body = { 
          "nombre": materia.nombre
      } 
      return this.http.post<any>(endpoints.agregarMateria,body); 
    } 
    // Eliminar un estudiante 
    eliminarMateria(id: number){ 
      return this.http.delete<any>(endpoints.eliminarMateria.replace(':id',id.toString()));
    }
    // Actualizar estudiante 
    actualizarMateria(id: number, materia: Materia){ 
        // Se arma el objeto a enviar 
        let body = { 
            "id": materia.id, 
            "nombre": materia.nombre
        } 
        return this.http.put<number>(endpoints.actualizarMateria.replace(':id',id.toString()), body); 
}
} 