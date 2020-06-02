import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCoinsPage } from './my-coins.page';

const routes: Routes = [
  {
    path: '',
    component: MyCoinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCoinsPageRoutingModule {}
