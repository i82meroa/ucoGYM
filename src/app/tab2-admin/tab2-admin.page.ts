import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set,} from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tab2-admin',
  templateUrl: 'tab2-admin.page.html',
  styleUrls: ['tab2-admin.page.scss']
})
export class Tab2AdminPage {
  
 nombreRutina:string;
 ejercicios:any[] = [];
 ejercicio:any = {};


       

  constructor(private router: Router) { }


addExercise()
{
  this.ejercicios.push(this.ejercicio);
  this.ejercicio = {};

}
  SaveRoutine(){

    const db = getDatabase();
    const referencia =  set(ref( db,' rutinas/' + this.nombreRutina), {
      nombreEjercicio: this.ejercicio.nombreEjercicio,
      seriesRep: this.ejercicio.seriesRepeticiones
    }); 

    
  }

} 
  
  
