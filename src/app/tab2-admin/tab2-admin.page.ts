import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tab2-admin',
  templateUrl: 'tab2-admin.page.html',
  styleUrls: ['tab2-admin.page.scss']
})
export class Tab2AdminPage {
  
 nombreRutina:string;
 ejercicios:any=[];
 ejercicio:any= {
  
   
     
 };

  constructor(private router: Router) { }

addExercise()
{
  console.log( this.ejercicio);
  this.ejercicios.push(this.ejercicio);
  console.log(this.ejercicios);
  this.ejercicio = {};

}
  SaveRoutine(){

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    console.log(this.nombreRutina)
    console.log(this.ejercicios);
    set(ref(db, 'rutinas/' + this.nombreRutina), this.ejercicios)};
    

  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
} 
  
  
