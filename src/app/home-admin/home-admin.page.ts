import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: 'home-admin.page.html',
  styleUrls: ['home-admin.page.scss']
})
export class HomeAdminPage {
  username: string;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
      this.username = window.localStorage.getItem('userUsername');
      console.log("Username is: " + this.username);
  }

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
