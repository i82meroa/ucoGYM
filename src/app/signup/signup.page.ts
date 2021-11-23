import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, onValue ,runTransaction} from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage{
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaNacimiento: string;
  dni: string;
  email: string;
  pass: string;
  user: string;
  mensajeErrorUsuario: string;

  constructor(private router: Router) { }

  signup(){
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app), 'usuarios/'+this.user);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if(data == null){
        document.getElementById('botonRegistrar').setAttribute('disabled','true');
        this.mensajeErrorUsuario='';
        set(dbRef, {
          user: this.user,
          nombre: this.nombre,
          apellidos: this.apellidos,
          email: this.email,
          telefono: this.telefono,
          dni: this.dni,
          password: this.pass,
          fechaNacimiento: this.fechaNacimiento,
          rol: 'usuario'
        });
        this.router.navigateByUrl('/');
      }else{
        this.mensajeErrorUsuario='El nombre de usuario ya existe';
      }
    });
  }
}
