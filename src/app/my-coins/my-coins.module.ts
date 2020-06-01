import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCoinsPageRoutingModule } from './my-coins-routing.module';

import { MyCoinsPage } from './my-coins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCoinsPageRoutingModule
  ],
  declarations: [MyCoinsPage]
})
export class MyCoinsPageModule {}
