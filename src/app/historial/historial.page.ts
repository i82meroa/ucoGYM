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
  username: String;
  pesajesList: Array<any>;

  

  constructor(private router: Router) { }

  getUsername() {
    this.username = window.localStorage.getItem('userUsername');
  }

  obtenerPesaje() {
    this.getUsername();
    console.log('Usuario encontrado. Nombre: ', this.username);
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'pesajes/' +this.username)).then((snapshot)=> {
     
      if(snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        console.log('Este usuario tiene algún pesaje.');
        console.log(resultadoPeticion);

      
        for(const i in this.pesajesList) {
          this.pesajesList.push(resultadoPeticion[i]);
          console.log(this.pesajesList[i]);
        }
      }

    }).catch((error)=> {
      console.error(error);
    });

  }

}
