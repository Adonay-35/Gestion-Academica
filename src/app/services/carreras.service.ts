import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Carrera } from '../interfaces/carrera.interface';
@Injectable({
providedIn: 'root'
})
export class CarrerasService {
    private readonly http = inject(HttpClient); 
 
    constructor() { } 
    
    // Obtener lista de estudiantes 
    obtenerCarreras() { 
      return this.http.get<Carrera[]>(endpoints.obtenerCarreras); 
    } 
    // Obtener estudiante por ID 
    obtenerCarreraPorID(id: number){ 
      return this.http.get<Carrera>(endpoints.obtenerCarreraPorID.replace(':id', id.toString())); 
    } 
    // Insertar estudiante 
    agregarCarrera(carrera: Carrera){ 
      // Se arma el objeto a enviar 
      let body = { 
          "codigo": carrera.codigo, 
          "nombre": carrera.nombre
      } 
      return this.http.post<any>(endpoints.agregarCarrera,body); 
    } 
    // Eliminar un estudiante 
    eliminarCarrera(id: number){ 
      return this.http.delete<any>(endpoints.eliminarCarrera.replace(':id',id.toString()));
    }
    // Actualizar estudiante 
    actualizarCarrera(id: number, carrera: Carrera){ 
        // Se arma el objeto a enviar 
        let body = { 
            "id": carrera.id, 
            "codigo": carrera.codigo,
            "nombre": carrera.nombre
        } 
        return this.http.put<number>(endpoints.actualizarCarrera.replace(':id',id.toString()), body); 
    }
}
