import { Component, inject } from '@angular/core'; 
import { RouterOutlet } from '@angular/router'; 
import { EstudiantesService } from './services/estudiantes.service'; 
import { CommonModule } from '@angular/common'; 
import { CarrerasService } from './services/carreras.service';
import { GruposService } from './services/grupos.service';
import { MateriasService } from './services/materias.service';
import { ProfesoresService } from './services/profesores.service';
 
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.scss' 
}) 
export class AppComponent { 
  title = 'GestionAcademica'; 
 
  // Haciendo inyeccion de dependencia 
  private readonly estudiantesServices = inject(EstudiantesService); 
 
  // Creando observable 
  estudiantes$ = this.estudiantesServices.obtenerEstudiantes();

/*------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------- */
  private readonly carrerasServices = inject(CarrerasService);
  carreras$ = this.carrerasServices.obtenerCarreras(); 

  /*------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------- */
private readonly gruposServices = inject(GruposService);
grupos$ = this.gruposServices.obtenerGrupos(); 

/*------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------- */
private readonly materiasServices = inject(MateriasService);
materias$ = this.materiasServices.obtenerMaterias(); 

/*------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------- */
private readonly profesoresServices = inject(ProfesoresService);
profesores$ = this.profesoresServices.obtenerProfesores(); 

} 