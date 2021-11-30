import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, onValue ,runTransaction} from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {
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

  ngOnInit() {
    this.user=localStorage.getItem('userUsername');
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app), 'usuarios/'+this.user);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if(data != null){
        this.nombre = data['nombre'];
        this.apellidos = data['apellidos'];
        this.email = data['email'];
        this.telefono = data['telefono'];
        this.dni = data['dni'];
        this.pass = data['password']
        this.fechaNacimiento = data['fechaNacimiento'];
      }
    });
  }

  editProfile(){
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app), 'usuarios/'+this.user);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if(data != null){
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
        this.router.navigateByUrl('/login');
      }
    });
  }
}
