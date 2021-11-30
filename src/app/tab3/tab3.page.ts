import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 mensajeError: String ;
 nombreRutina: any = [] ;
  rutina: String;
  ListaEjercicios: any = [];
  ejercicio: string;
  NRutina: string;


 

  constructor() {}


  ShowRoutines(){
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    const referencia= get(child(dbRef, 'rutinas/')).then((snapshot)=> {

      if (snapshot.exists())
      {
        const resultadoPeticion = snapshot.val();
        console.log(resultadoPeticion);
        for (const i in resultadoPeticion){
       
             this.nombreRutina.push(resultadoPeticion[i].nombreRutina)
           }
          console.log(this.nombreRutina) 
          this.mensajeError = 'Esta rutina no existe en nuestro plan';
      }
  }).catch((error) => {
    console.error(error);
  
  });

   this.nombreRutina = []};


mostrarRutina(){

  const app = initializeApp(environment.firebase);
  const db = getDatabase(app);
  const dbRef = ref(getDatabase(app));
  const referencia= get(child(dbRef, 'rutinas/')).then((snapshot)=> {

    if (snapshot.exists())
    {
      const resultadoPeticion = snapshot.val();
      console.log(resultadoPeticion);
      for (const i in resultadoPeticion){
       console.log (this.NRutina)
        if(this.NRutina === resultadoPeticion[i].nombreRutina)
        {
          this.ListaEjercicios=resultadoPeticion[i].ejercicios
        }          
      }
      
      console.log(this.ListaEjercicios);
      this.mensajeError = 'Esta rutina no existe en nuestro plan';
    }
    

}).catch((error) => {
  console.error(error);

});
this.ListaEjercicios = [];
}
}