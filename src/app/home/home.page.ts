import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  username: string;

  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.getUsername();
  }

  getUsername() {
      this.username = window.localStorage.getItem('userUsername');
  }

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
