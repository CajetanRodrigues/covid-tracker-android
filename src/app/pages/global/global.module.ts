import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalPageRoutingModule } from './global-routing.module';

import { GlobalPage } from './global.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalPageRoutingModule
  ],
  declarations: [GlobalPage]
})
export class GlobalPageModule {}
