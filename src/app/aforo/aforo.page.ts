import { Component } from '@angular/core';
import { getDatabase, ref, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-aforo',
  templateUrl: './aforo.page.html',
  styleUrls: ['./aforo.page.scss'],
})
export class AforoPage {
  mensajeError: string;
  currentDate: string = new Date().toISOString().slice(0, 10);
  aforoActual: string;

  constructor() { }

  ionViewDidEnter() {
    this.consultarAforo()
    this.getAforo()
  }

  getAforo() {
    if (window.localStorage.getItem('aforoActual') == null) {
      this.aforoActual = "0"
    }
    else {
      this.aforoActual = window.localStorage.getItem('aforoActual');
    }
    console.log("Current capacity: " + this.aforoActual);
  }

  consultarAforo() {
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'aforo/')).then((snapshot) => {
      if (snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        for (const fecha in resultadoPeticion){
          if (fecha === this.currentDate){
            window.localStorage.setItem('aforoActual', resultadoPeticion[fecha].aforoActual);
            return;
          }
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}
