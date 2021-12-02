/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {
  username: string;
  pesajesList: any = [];
  pesaje: string;

  resultadosList: any = [];
  resultado: string;
  
  constructor(private router: Router) { }

  getUsername() {
    this.username = window.localStorage.getItem('userUsername');
  }

  ionViewDidEnter(){
    this.obtenerFecha();
    this.resultadosList = [];
    
  }
  obtenerFecha() {
    this.getUsername();
    console.log('Usuario encontrado. Nombre: ', this.username);
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'pesajes/' +this.username)).then((snapshot)=> {
     
      if(snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        console.log('Este usuario tiene algún pesaje.');
     

      
        for(const i in resultadoPeticion) {
          this.pesajesList.push(resultadoPeticion[i]);
          console.log(this.pesajesList);
        }
      }

    }).catch((error)=> {
      console.error(error);
    });
    this.pesajesList = [];
  }
obtenerPesaje(fecha : string){

  const app = initializeApp(environment.firebase);
  const dbRef = ref(getDatabase(app));
  const referencia = get(child(dbRef, 'pesajes/' +this.username)).then((snapshot)=> {
   
    if(snapshot.exists()) {
      const resultadoPeticion = snapshot.val();
    
      for(const i in resultadoPeticion) {
        if(fecha === resultadoPeticion[i].fecha)
        {
          this.resultadosList.push(resultadoPeticion[i]);
          console.log("coger resultado", this.resultadosList);
        }
       
      }
    }

  }).catch((error)=> {
    console.error(error);
  });
  this.resultadosList = [];
}

}
