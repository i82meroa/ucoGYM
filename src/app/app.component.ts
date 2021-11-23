import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private router: Router) {
    platform.ready().then(() => {
      if (window.localStorage.getItem('userAuth') && window.localStorage.getItem('userRol') === 'usuario'){
        this.router.navigateByUrl('/tabs/home');
      }
      else if (window.localStorage.getItem('userAuth') && window.localStorage.getItem('userRol') === 'administrador'){
        this.router.navigateByUrl('/tabs-admin/home-admin');
      }
      else {
        this.router.navigateByUrl('/login');
      }
    });
    console.log('Inicio de app');
  }
}
