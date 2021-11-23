import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-aforo',
  templateUrl: './aforo.page.html',
  styleUrls: ['./aforo.page.scss'],
})
export class AforoPage implements OnInit {
  mensajeError: string;
  currentDate: string = new Date().toLocaleDateString();
  aforoActual: string;

  constructor() { }

  ngOnInit() {
  }

  getAforo() {
    this.aforoActual = window.localStorage.getItem('aforoActual');
    console.log("Current capacity: " + this.aforoActual);
}

  consultarAforo() {
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'aforo/')).then((snapshot) => {
      if (snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        for (const aforo in resultadoPeticion){
          if (resultadoPeticion[aforo].fecha === this.currentDate){
            window.localStorage.setItem('aforoActual', resultadoPeticion[aforo].aforoActual);
            return;
          }
        }
      }
      this.mensajeError = 'No hay registros de aforo para la fecha actual';
    }).catch((error) => {
      console.error(error);
    });
  }

}
