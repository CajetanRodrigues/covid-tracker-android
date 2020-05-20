import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistrictPage } from './district.page';

const routes: Routes = [
  {
    path: '',
    component: DistrictPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistrictPageRoutingModule {}
