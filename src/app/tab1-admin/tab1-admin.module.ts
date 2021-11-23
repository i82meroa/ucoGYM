import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1AdminPageRoutingModule } from './tab1-admin-routing.module';

import { Tab1AdminPage } from './tab1-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1AdminPageRoutingModule
  ],
  declarations: [Tab1AdminPage]
})
export class Tab1AdminPageModule {}
