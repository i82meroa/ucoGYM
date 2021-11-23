import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1AdminPage } from './tab1-admin.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1AdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1AdminPageRoutingModule {}
