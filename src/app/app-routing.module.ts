import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/district', // Change it to /tutorial later 
    pathMatch: 'full'
  },
  {
    path: 'meals',
    loadChildren: () => import('./pages/meals/meals.module').then( m => m.MealsPageModule)
  },
  {
    path: 'global',
    loadChildren: () => import('./pages/global/global.module').then( m => m.GlobalPageModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'analysis',
    loadChildren: () => import('./pages/analysis/analysis.module').then( m => m.AnalysisPageModule)
  },
  {
    path: 'district',
    loadChildren: () => import('./pages/district/district.module').then( m => m.DistrictPageModule)
  }







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
