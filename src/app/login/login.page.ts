import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  mensajeError: string;
  username: string;
  password: string;


  constructor(private router: Router) {}

  login(){
    console.log('Bindeo correcto. Username: ',this.username,' ; password: ', this.password);
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'usuarios/')).then((snapshot) => {
      if (snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        for (const user in resultadoPeticion){
          if (resultadoPeticion[user].user === this.username && resultadoPeticion[user].pass === this.password){
            window.localStorage.setItem('userRol', resultadoPeticion[user].rol);
            window.localStorage.setItem('userAuth', 'true');
            window.localStorage.setItem('userUsername', this.username);

            if (resultadoPeticion[user].rol === 'administrador'){
              this.router.navigateByUrl('/tabs-admin/tab1-admin');
            }
            else{
              this.router.navigateByUrl('/tabs/tab1');
            }
            return;
          }
        }
      }
      this.mensajeError = 'Error con alguna de las credenciales';
    }).catch((error) => {
      console.error(error);
    });
  }

  irRegistro(){
    this.router.navigateByUrl('/signup');
  }

}
