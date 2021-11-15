import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsAdminPage } from './tabs-admin.page';

const routes: Routes = [
  {
    path: 'tabs-admin',
    component: TabsAdminPage,
    children: [
      {
        path: 'tab1-admin',
        loadChildren: () => import('../tab1-admin/tab1-admin.module').then(m => m.Tab1AdminPageModule)
      },
      {
        path: 'tab2-admin',
        loadChildren: () => import('../tab2-admin/tab2-admin.module').then(m => m.Tab2AdminPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-admin/tab1-admin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-admin/tab1-admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsAdminPageRoutingModule {}
