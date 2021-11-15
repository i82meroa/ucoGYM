import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2AdminPage } from './tab2-admin.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2AdminPageRoutingModule } from './tab2-admin-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2AdminPageRoutingModule
  ],
  declarations: [Tab2AdminPage]
})
export class Tab2AdminPageModule {}
