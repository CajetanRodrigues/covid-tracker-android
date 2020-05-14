import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryPage } from './country.page';

const routes: Routes = [
  {
    path: '',
    component: CountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryPageRoutingModule {}
