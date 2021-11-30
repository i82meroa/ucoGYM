/* eslint-disable guard-for-in */
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
  mensajeError: string;
  nombreRutina: any = [] ;
  rutina: string;
  listaEjercicios: any = [];
  ejercicio: string;
  rutinas: any = [];

  constructor() {}

  ionViewDidEnter(){
    this.showRoutines();
    this.listaEjercicios = [];
  }

  showRoutines(){
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    const referencia= get(child(dbRef, 'rutinas/')).then((snapshot)=> {

      if (snapshot.exists()){
        const resultadoPeticion = snapshot.val();
        console.log(resultadoPeticion);
        for (const i in resultadoPeticion){
          this.rutinas.push(resultadoPeticion[i]);
        };
        console.log('Rutinas: ',this.rutinas);
        this.mensajeError = 'Esta rutina no existe en nuestro plan';
      }}).catch((error) => {
        console.error(error);
      });

   this.rutinas = [];
  };


mostrarRutina(nombreRutina: string){
  const app = initializeApp(environment.firebase);
  const db = getDatabase(app);
  const dbRef = ref(getDatabase(app));
  const referencia= get(child(dbRef, 'rutinas/')).then((snapshot)=> {

    if (snapshot.exists())
    {
      const resultadoPeticion = snapshot.val();
      console.log(resultadoPeticion);
      for (const i in resultadoPeticion){
        if(nombreRutina === resultadoPeticion[i].nombreRutina)
        {
          this.listaEjercicios = resultadoPeticion[i].ejercicios;
        };
      }
      console.log(this.listaEjercicios);
      this.mensajeError = 'Esta rutina no existe en nuestro plan';
    }}).catch((error) => {
      console.error(error);
    });
this.listaEjercicios = [];
  }
}
