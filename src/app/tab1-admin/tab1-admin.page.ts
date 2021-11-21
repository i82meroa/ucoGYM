import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1-admin',
  templateUrl: 'tab1-admin.page.html',
  styleUrls: ['tab1-admin.page.scss']
})
export class Tab1AdminPage {

  constructor(private router: Router) {}

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}