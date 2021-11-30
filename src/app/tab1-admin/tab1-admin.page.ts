import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1-admin',
  templateUrl: 'tab1-admin.page.html',
  styleUrls: ['tab1-admin.page.scss']
})
export class Tab1AdminPage {
  username: string;
  fechaPesaje: Date= new Date();
  peso: number;
  imc: number;
  metabolismoBasal: number;
  grasa: number;
  masaMuscular: number;
  porcentajeAgua: number;


  constructor(private router: Router) {}

  anadirPesaje(_user, _peso, _imc, _metabolismoBasal, _grasa, _masaMuscular, _porcentajeAgua) {
    console.log('Bindeo correcto. Username: ',this.username,' fecha de Pesaje: ', this.fechaPesaje, ' Peso: ', this.peso, ' imc: ',
    this.imc, ' Metabolismo Basal: ', this.metabolismoBasal, ' Grasa: ', this.grasa, ' Masa Muscular: ', this.masaMuscular,
    ' Porcentaje de agua: ', this.porcentajeAgua);

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    const referencia= get(child(dbRef, 'pesajes/' +_user)).then((snapshot)=> {

      if(snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        console.log('Este usuario ya tiene un pesaje. Añadiendo pesaje...');
        console.log(resultadoPeticion);

        const idUnico = Date.now();

        const nuevoPesaje = {
          [idUnico]: {
            username: _user,
            fecha: idUnico,
            peso: _peso,
            imc: _imc,
            metabolismoBasal: _metabolismoBasal,
            grasa: _grasa,
            masaMuscular: _masaMuscular,
            porcentajeAgua: _porcentajeAgua
          }
        };

        const nuevoObjeto = {...resultadoPeticion, ...nuevoPesaje};
        console.log(nuevoObjeto);
        set(ref(db, 'pesajes/' +_user), nuevoObjeto);
      }
      else {
        console.log('Este usuario no tiene asignado ningun pesaje. Creando pesaje...');
        const idUnico = Date.now();

        const nuevoPesaje = {
          [idUnico]: {
            username: _user,
            fecha: idUnico,
            peso: _peso,
            imc: _imc,
            metabolismoBasal: _metabolismoBasal,
            grasa: _grasa,
            masaMuscular: _masaMuscular,
            porcentajeAgua: _porcentajeAgua
          }
        };
        set(ref(db, 'pesajes/' +_user), nuevoPesaje);
      }

    }).catch((error)=> {
      console.error(error);
    });
  }

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
