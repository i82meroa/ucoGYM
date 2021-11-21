import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: 'home-admin.page.html',
  styleUrls: ['home-admin.page.scss']
})
export class HomeAdminPage {

  constructor(private router: Router) {}

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
