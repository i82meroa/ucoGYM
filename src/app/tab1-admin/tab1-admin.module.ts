import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1AdminPage } from './tab1-admin.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1AdminPageRoutingModule } from './tab1-admin-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1AdminPageRoutingModule
  ],
  declarations: [Tab1AdminPage]
})
export class Tab1AdminPageModule {}
