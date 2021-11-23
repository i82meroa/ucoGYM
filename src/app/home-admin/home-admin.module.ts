import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeAdminPage } from './home-admin.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomeAdminPageRoutingModule } from './home-admin-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomeAdminPageRoutingModule
  ],
  declarations: [HomeAdminPage]
})
export class HomeAdminPageModule {}
