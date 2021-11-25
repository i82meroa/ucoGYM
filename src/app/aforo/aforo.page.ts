import { Component } from '@angular/core';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-aforo',
  templateUrl: './aforo.page.html',
  styleUrls: ['./aforo.page.scss'],
})
export class AforoPage {
  mensajeError: string;
  currentDate: string = new Date().toLocaleDateString();
  aforoActual: string;

  constructor() { }

  ionViewDidEnter() {
    this.escribirAforo()
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

  escribirAforo() {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    set(ref(db, 'aforo/' + this.currentDate), {
      aforoActual: 12,
    });
  }

  consultarAforo() {
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'aforo/')).then((snapshot) => {
      if (snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        for (const fecha in resultadoPeticion){
          if (resultadoPeticion[fecha] === this.currentDate){
            window.localStorage.setItem('aforoActual', resultadoPeticion[fecha].aforoActual);
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
