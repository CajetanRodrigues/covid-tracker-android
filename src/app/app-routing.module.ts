import { SignUpModule } from './pages/signup/signup.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', // Change it to /tutorial later 
    pathMatch: 'full'
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
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignUpModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
