import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2AdminPage } from './tab2-admin.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2AdminPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2AdminPageRoutingModule {}
