import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  mensajeError: string;
  email: string;
  password: string;


  constructor(private router: Router) {}

  login(){
    console.log('Bindeo correcto. Email: ',this.email,' ; password: ', this.password);
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'usuarios/')).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().forEach(user => {
          if (user.email === this.email && user.password === this.password){
            window.localStorage.setItem('userRol', user.rol);
            window.localStorage.setItem('userAuth', 'true');
            window.localStorage.setItem('userEmail', this.email);

            if (user.rol === 'administrador'){
              this.router.navigateByUrl('/tabs-admin/tab1-admin');
            }
            else{
              this.router.navigateByUrl('/tabs/tab1');
            }
            return;
          }
        });
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
